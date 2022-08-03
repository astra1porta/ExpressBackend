const ConfigFormatter = require("./config-formatter");

module.exports = function parseConnectionString(str) {
  const fields = str.split(';');
  const config = {
    server: "",
    port: 1433,
    encrypt: true,
    database: "",
    user: "",
    password: ""
  };

  for(const pair of fields){
    const [key, value] = pair.split("=").map(part => part.trim());

    switch(key.toLowerCase()) {
      case "server": 
      case "data source": let port = value.match(/,(\d+)$/);
                          config.port = port ? Number(port[1]) : 1433;
                          config.server = value.replace(/^tcp:/, "").replace(/, \d+$/, "");
                          break;
      case "initial catalog":
      case "database": config.database = value;
                        break;
      case "user id": config.user = value;
                      break;
      case "password": config.password = value;
                      break;
      case "encrypt": config.encrypt = value.toLowerCase() === "true";
                      break;
    }
  }
  return new ConfigFormatter(config);
}