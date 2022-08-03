const makeInjectable = require("../../../helpers/makeInjectable");
const onlyNumbers = /^[0-9]*$/;
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

    if(!parseInt(req.params.crewId)){
      return res.status(406).json("Request body 'crewId' is not a number");
    }
    
    const pilot = await knex("dbo.Pilots")
      .where({ crewId: parseInt(req.params.crewId) })
      .del();
    if (!pilot) {
      return res.status(404).send();
    }

    return res.status(204).send();
  }
);
