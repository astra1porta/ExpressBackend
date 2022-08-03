/* istanbul ignore file */

const Knex = require("knex");
const makeKnex = require("knex");
const shortid = require("shortid");
const path = require("path");
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");
const fs = require("fs-extra");
const _ = require("lodash");

/**
 * Generates randomized string for file names to prevent conflicts.
 */
const randStr = () => shortid.generate();

/**
 * Options for the mockKnex function. Pass `schema` and `data` to construct the database from scratch before each test.
 * Pass `sourceDirectory` instead to use a prepared database.
 *
 * @param schema - Path to the .sql file to initialize SQLite DB.
 * @param seeds - Path to a folder containing JSON files, or an array of paths to JSON files to populate SQLite DB.
 * @param snapshot - Folder containing prepared database files and a manifest.json.
 * @param testPath - Root folder to store any files created during tests.
 */
module.exports = async function makeMockKnex(options) {
  let manifest = {
    entry: "",
    schemas: [
      {
        path: "",
        name: "",
      },
    ],
  };
  let tempDir = path.join(options.testPath, randStr());

  await mkdirp(tempDir);

  if (options.snapshot) {
    const loaded = await loadManifest(
      path.join(options.snapshot, "snapshot.json"),
      tempDir
    );

    knex = loaded.knex;
    manifest = loaded.manifest;
  } else if (options.schema && options.seeds) {
    const schema = fs.readFileSync(options.schema, "utf-8");
    const [dataErr, data] = loadDataFiles(options.seeds);
    if (dataErr) {
      throw dataErr;
    }

    const prepared = await prepare(schema, data, tempDir);

    knex = prepared.knex;
    manifest = prepared.manifest;
  } else {
    throw new Error(
      `Must pass a 'snapshot' path to use a prepared database, or a 'schema' path and 'seeds' path to construct the DB for each test.`
    );
  }

  return {
    knex,

    /**
     * Copy the initialized DB files to a directory for reuse.
     */
    snapshot: async (exportPath) => {
      await mkdirp(exportPath);

      await fs.copy(tempDir, exportPath);

      fs.writeFileSync(
        path.join(exportPath, "snapshot.json"),
        JSON.stringify(manifest, null, 2)
      );
    },

    /**
     * Remove the database file.
     */
    clean: async () => {
      await knex.destroy();

      if (fs.existsSync(tempDir)) {
        rimraf.sync(tempDir);
      }
    },
  };
};

function loadDataFiles(dataDirectory) {
  const data = fs
    .readdirSync(dataDirectory)
    .filter((f) => !/^[._]/.test(path.basename(f)[0]))
    .map((_path) =>
      path.isAbsolute(_path) ? _path : path.join(dataDirectory, _path)
    );

  const dataFiles = {};

  for (const _path of data) {
    try {
      const loaded = JSON.parse(fs.readFileSync(_path, "utf-8"));
      if (!Array.isArray(loaded)) {
        throw new Error(
          `Data files must contain an array of objects. Received ${typeof loaded}.`
        );
      }
      const tableName = path.basename(_path, path.extname(_path));

      dataFiles[tableName] = loaded;
    } catch (err) {
      console.error(`Error loading file '${_path}'`);
      console.error(err);

      return [err, null];
    }
  }

  return [null, dataFiles];
}

/**
 * Loads a set of prepared DB files by copying to a temporary folder.
 *
 * @param manifestPath - Path to the directory containing the SQLite files to load.
 */
async function loadManifest(manifestPath, tempDir) {
  const manifest = require(manifestPath);
  const basePath = path.dirname(manifestPath);

  const schemas = manifest.schemas.map((s) => s.name);

  await fs.copy(basePath, tempDir);

  const knex = makeKnex({
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: path.join(tempDir, "main.db"),
    },
  });

  // Create attached DBs to simulate schemas.
  for (const name of schemas) {
    const dbPath = path.join(tempDir, name + ".db");

    try {
      await knex.raw("ATTACH DATABASE :path AS :name", {
        path: dbPath,
        name: name,
      });
    } catch (err) {
      console.warn(`Failed to attach sqlite schema DB '${name}' at ${dbPath}`);

      // Close Knex connection to free up temp files for removal.
      await knex.destroy();
      throw err;
    }
  }

  return {
    knex,
    manifest,
  };
}

/**
 * Prepares SQLite DBs based on an options object.
 *
 * @param options - MockKnexOptions
 */
async function prepare(schema, data, tempDir) {
  // Split schema file into lines and remove comments.
  const schemaLines = _(schema)
    .split("\n")
    .map((line) => line.trim().replace(/--.*$/g, ""))
    .filter((line) => line != "")
    .value();

  // Re-join into statements.
  const statements = schemaLines
    .join("")
    .split(";")
    .filter((x) => x != "");

  // Extract schema names from the SQL schema file.
  let schemas = _(schemaLines)
    .filter((line) => /^CREATE\s+TABLE/i.test(line))
    .map((line) =>
      line.match(/^CREATE\s+TABLE\s+[\[\`]?(.+?)[\]\`]?\.(.+)\s+/i)
    )
    .filter((matches) => matches != null)
    .map((matches) => matches[1])
    .value();

  // Identify attached DBs to be created.
  for (const table in data) {
    if (table.includes(".")) {
      const schemaName = table.split(".")[0];

      schemas.push(schemaName);
    }
  }

  // Deduplicate schemas by name so we don't end up trying to create DBs twice.
  schemas = _.uniq(schemas);

  const knex = makeKnex({
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: path.join(tempDir, "main.db"),
    },
  });

  // Create attached DBs to simulate schemas.
  for (const name of schemas) {
    const dbPath = path.join(tempDir, name + ".db");

    try {
      await knex.raw("ATTACH DATABASE :path AS :name", {
        path: dbPath,
        name: name,
      });
    } catch (err) {
      console.warn(`Failed to attach sqlite schema DB '${name}' at ${dbPath}`);

      await knex.destroy();
      throw err;
    }
  }

  for (const statement of statements) {
    try {
      await knex.raw(statement);
    } catch (err) {
      console.warn(`Failed to execute DB setup statement: ${statement}`);

      await knex.destroy();
      throw err;
    }
  }

  // Populate tables
  for (const table in data) {
    for (const record of data[table]) {
      try {
        await knex(table).insert(record);
      } catch (err) {
        console.warn(
          `Failed to insert seed data to table '${table}': ${JSON.stringify(
            record
          )}`
        );

        await knex.destroy();
        throw err;
      }
    }
  }

  return {
    knex,
    manifest: {
      entry: "./main.db",
      schemas: schemas.map((s) => ({
        path: `./${s}.db`,
        name: s,
      })),
    },
  };
}
