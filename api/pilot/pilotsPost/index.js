const makeInjectable = require("../../../helpers/makeInjectable");
const onlyNumbers = /^[0-9]*$/;
const isUpper = /^[A-Z]*$/;
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
    if (!req.body) {
      return res.status(406).json({ message: "Request body missing." });
    }
    if (!req.body.airline || req.body.airline === "") {
      return res
        .status(406)
        .json({ message: "Request body missing 'airline' parameter." });
    }
    if (req.body.airline.length !== 2 || !req.body.airline.match(isUpper)) {
      return res
        .status(403)
        .json({ message: "Request body 'airline' parameter invalid." });
    }
    if (!req.body.firstName || req.body.firstName === "") {
      return res
        .status(406)
        .json({ message: "Request body missing 'firstName' parameter." });
    }
    if (req.body.firstName.length > 100) {
      return res
        .status(403)
        .json({ message: "Request body 'firstName' parameter invalid." });
    }
    if (!req.body.lastName || req.body.lastName === "") {
      return res
        .status(406)
        .json({ message: "Request body missing 'lastName' parameter." });
    }
    if (req.body.lastName.length > 100) {
      return res
        .status(403)
        .json({ message: "Request body 'lastName' parameter invalid." });
    }
    if (!req.body.fleet || req.body.fleet === "") {
      return res
        .status(406)
        .json({ message: "Request body missing 'fleet' parameter." });
    }
    if (req.body.fleet.length > 3) {
      return res
        .status(403)
        .json({ message: "Request body 'fleet' parameter invalid." });
    }
    if (!req.body.seat || req.body.seat === "") {
      return res
        .status(406)
        .json({ message: "Request body missing 'seat' parameter." });
    }
    if (req.body.seat.length > 3) {
      return res
        .status(403)
        .json({ message: "Request body 'seat' parameter invalid." });
    }
    if (!req.body.domicile || req.body.domicile === "") {
      return res
        .status(406)
        .json({ message: "Request body missing 'domicile' parameter." });
    }
    if (req.body.domicile.length > 3) {
      return res
        .status(403)
        .json({ message: "Request body 'domicile' parameter invalid." });
    }
    if (req.body.trainingFacility.length > 500) {
      return res.status(403).json({
        message: "Request body 'trainingFacility' parameter invalid.",
      });
    }
    if (!req.body.company || req.body.company === "") {
      return res
        .status(406)
        .json({ message: "Request body missing 'company' parameter." });
    }
    if (req.body.company.length > 100) {
      return res
        .status(403)
        .json({ message: "Request body 'company' parameter invalid." });
    }
    if (!req.body.address1 || req.body.address1 === "") {
      return res.status(406).json({
        message: "Request body missing 'address1' parameter.",
      });
    }
    if (req.body.address1.length > 100) {
      return res
        .status(403)
        .json({ message: "Request body 'address1' parameter invalid." });
    }
    if (req.body.address2 && req.body.address2.length > 100) {
      return res
        .status(403)
        .json({ message: "Request body 'address2' parameter invalid." });
    }
    if (!req.body.city || req.body.city === "") {
      return res
        .status(406)
        .json({ message: "Request body missing 'city' parameter." });
    }
    if (req.body.city.length > 100) {
      return res.status(403).json({
        message: "Request body 'city' parameter invalid.",
      });
    }
    if (!req.body.state || req.body.state === "") {
      return res.status(406).json({
        message: "Request body missing 'state' parameter.",
      });
    }
    if (req.body.state.length !== 2 || !req.body.state.match(isUpper)) {
      return res
        .status(403)
        .json({ message: "Request body 'state' parameter invalid." });
    }
    if (!req.body.postalCode || req.body.postalCode === "") {
      return res
        .status(406)
        .json({ message: "Request body missing 'postalCode' parameter." });
    }
    if (req.body.postalCode.length > 25) {
      return res.status(403).json({
        message: "Request body 'postalCode' parameter invalid.",
      });
    }
    if (
      req.body.areaCode &&
      (!req.body.areaCode.match(onlyNumbers) || req.body.areaCode.length !== 3)
    ) {
      return res.status(403).json({
        message: "Request body 'areaCode' parameter contains invalid data.",
      });
    }
    if (
      req.body.prefix &&
      (!req.body.prefix.match(onlyNumbers) || req.body.prefix.length !== 3)
    ) {
      return res.status(403).json({
        message: "Request body 'prefix' parameter contains invalid data.",
      });
    }
    if (
      req.body.suffix &&
      (!req.body.suffix.match(onlyNumbers) || req.body.suffix.length !== 4)
    ) {
      return res.status(403).json({
        message: "Request body 'suffix' parameter contains invalid data.",
      });
    }

    await knex("Pilots")
      .insert({
        airline: req.body.airline,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fleet: req.body.fleet,
        seat: req.body.seat,
        domicile: req.body.domicile,
        trainingFacility: req.body.trainingFacility,
        company: req.body.company,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        areaCode: req.body.areaCode,
        prefix: req.body.prefix,
        suffix: req.body.suffix,
      });
  const id = (await knex("Pilots")
    .where({lastName: req.body.lastName})
    .select("crewId").orderBy('crewId', 'desc').limit(1))[0];

    return res.status(201).json(id).send();
  }
);
