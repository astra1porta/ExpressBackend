const toKnexConfig = require("Knex");

module.exports = class ConfigFormatter {
  constructor(config) {
    this.config = config;
  }
  asParsed() {
    return this.config;
  }
  toKnexConfig() {
    return this.config;
  }
};
