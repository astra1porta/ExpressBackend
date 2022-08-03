const fs = require("fs");
const path = require("path");
const makeMockKnex = require("../helpers/makeMockKnex");

const folder = process.argv[2];
const tempPath = path.join(__dirname, "../", "api", folder, "_test", "temp");

async function main() {
  const mock = await makeMockKnex({
    testPath: tempPath,
    schema: path.join(__dirname, "../", "api", folder, "_test", "schema.sql"),
    seeds: path.join(__dirname, "../", "api", folder, "_test", "seeds"),
  });

  await mock.snapshot(
    path.join(__dirname, "../", "api", folder, "_test", "snapshot")
  );

  await mock.clean();
}

main()
  .then(() => {
    console.log(`Created database for ${folder}`);
  })
  .catch((ex) => {
    console.error(ex);

    // clean temp folder
    const interval = setInterval(() => {
      try {
        fs.rmdirSync(tempPath, { recursive: true });
        clearInterval(interval);
        process.exit(0);
      } catch {
        process.exit(1);
      }
    }, 100);
  });
