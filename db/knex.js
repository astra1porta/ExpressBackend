const parseConnectionString = require('../helpers/parseConnectionString.js');
const knex = require("knex");

module.exports = function makeKnex(connectionString = null) {
   if(connectionString == null) {
     connectionString =
       "Server=tcp:cis259-mike.database.windows.net;Initial Catalog=cis259;Persist Security Info=False;User ID=[yourid];Password=[yourpassword];MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
   }
  
  

  const config = parseConnectionString(connectionString).toKnexConfig();

  return knex({
    client: "mssql",
    connection: {
      ...config,

      connectionTimeout: 120000,
      requestTimeout: 120000,
      options: {
        enableArithAbort: true,
      },
    },
    pool: {
      min: 0,
      max: 50,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: true,
    },
    log: {
      error(message) {
        console.error(message);
      },
    },
  });
};
