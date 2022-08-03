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
    if(!req.body){
      return res.status(406).json({message: "Request body missing"});
    }
    if(!req.body.id) {
      return res
        .status(406)
        .json({ message: "Request body missing 'id' property" });
    }
    if (!req.body.title) {
      return res
        .status(406)
        .json({ message: "Request body missing 'title' property" });
    }
    if (!req.body.state) {
      return res
        .status(406)
        .json({ message: "Request body missing 'state' property" });
    }

    await knex('dbo.Tasks').where('id', '=', req.body.id).update({
      title: req.body.title,
      state: req.body.state
    });

    return res.status(204).send();
  }
);
