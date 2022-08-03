const makeInjectable = require("../../../helpers/makeInjectable");

module.exports = makeInjectable(
  {
    defaults: {
      knex: /* istanbul ignore next */ () => require("../../../db/knex")(),
    },
    cleanup: {
      knex: /* istanbul ignore next */ (knex) => knex.destroy(),
    },
  },
  async function ({ knex }, req, res) {
    const pilots = await knex("dbo.Pilots");

    return res.status(200).json(pilots);
  }
);