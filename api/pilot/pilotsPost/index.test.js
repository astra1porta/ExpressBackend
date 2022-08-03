const path = require("path");
const func = require("./index");

const makeMockKnex = require("../../../helpers/makeMockKnex");
const makeMockRes = require("../../../utils/makeMockRes");

let mock = null;

beforeEach(async() => {
  mock = await makeMockKnex({
    testPath: path.join(__dirname, "..", "_test", "temp"),
    snapshot: path.join(__dirname, "..", "_test", "snapshot")
  });
});

afterEach(async() => {
  await mock.clean();
});

test("pilots post returns a successful status if updated", async() => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex:mock.knex,
  
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
});
test("add pilot post fail if body not found", async () => {
  let req = {
    header: {},
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing.");
});

// airline field tests
test("add pilot post fail if airline not found", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'airline' parameter.");
});
test("add pilot post fail if airline blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'airline' parameter.");
});
test("add pilot post fail if airline is not 2 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "A",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];

  
  expect(body.message).toBe("Request body 'airline' parameter invalid.");
});
test("add pilot post fail if airline is not upper case", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "Aa",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe("Request body 'airline' parameter invalid.");
});
// firstName field tests
test("add pilot post fail if firstName missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'firstName' parameter.");
});
test("add pilot post fail if firstName blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'firstName' parameter.");
});
test("add pilot post fail if firstName over 100 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName:
        "abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyZ",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);
 
  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe("Request body 'firstName' parameter invalid.");
});
// lastName field tests
test("add pilot post fail if lastName missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'lastName' parameter.");
});
test("add pilot post fail if lastName blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'lastName' parameter.");
});
test("add pilot post fail if lastName over 100 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName:
        "abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyZ",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe("Request body 'lastName' parameter invalid.");
});
// fleet field tests
test("add pilot post fail if fleet missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'fleet' parameter.");
});
test("add pilot post fail if fleet blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'fleet' parameter.");
});
test("add pilot post fail if fleet over 3 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "73GG",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(403);
  expect(body.message).toBe("Request body 'fleet' parameter invalid.");
});
// seat field tests
test("add pilot post fail if seat missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'seat' parameter.");
});
test("add pilot post fail if seat blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'seat' parameter.");
});
test("add pilot post fail if seat over 3 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "73G",
      seat: "CPTJ",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);
  
  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];

  
  expect(body.message).toBe("Request body 'seat' parameter invalid.");
});
// domicile field tests
test("add pilot post fail if domicile missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'domicile' parameter.");
});
test("add pilot post fail if domicile blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'domicile' parameter.");
});
test("add pilot post fail if domicile over 3 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEGG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(403);
  expect(body.message).toBe("Request body 'domicile' parameter invalid.");
});
// trainingFacility field tests
test("add pilot post fail if trainingFacility is over 500 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility:
        "abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyz",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe(
    "Request body 'trainingFacility' parameter invalid."
  );
});
// company field tests
test("add pilot post fail if company missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: 'GEG',
      trainingFacility: "Riviera State 32/106",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'company' parameter.");
});
test("add pilot post fail if company blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'company' parameter.");
});
test("add pilot post fail if company is over 100 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company:
        "abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyz",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe(
    "Request body 'company' parameter invalid."
  );
});
// address1 field tests
test("add pilot post fail if address1 missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      company: "American Airlines",
      trainingFacility: "Riviera State 32/106",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe(
    "Request body missing 'address1' parameter."
  );
});
test("add pilot post fail if address1 blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe(
    "Request body missing 'address1' parameter."
  );
});
test("add pilot post fail if address1 is over 100 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company:"American Airlines",
      address1:
        "abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyz",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe("Request body 'address1' parameter invalid.");
});
// address2 field tests
test("pilots update post will pass if address2 is empty", async () => {
  let req = {
    header: {},
    body: {
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
});
test("add pilot post fail if address2 is over 100 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2:
        "abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyz",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe("Request body 'address2' parameter invalid.");
});
// city field tests
test("add pilot post fail if city missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: 'GEG',
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'city' parameter.");
});
test("add pilot post fail if city blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'city' parameter.");
});
test("add pilot post fail if city is over 100 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyz",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe("Request body 'city' parameter invalid.");
});
// state field tests
test("add pilot post fail if state missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      company: "American Airlines",
      trainingFacility: "Riviera State 32/106",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe(
    "Request body missing 'state' parameter."
  );
});
test("add pilot post fail if state blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe(
    "Request body missing 'state' parameter."
  );
});
test("add pilot post fail if state is not 2 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "C",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe("Request body 'state' parameter invalid.");
});
test("add pilot post fail if state is not capitalized", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "Ca",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe("Request body 'state' parameter invalid.");
});
// postalCode field tests
test("add pilot post fail if postalCode missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: 'GEG',
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'postalCode' parameter.");
});
test("add pilot post fail if postalCode blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'postalCode' parameter.");
});
test("add pilot post fail if postalCode is over 25 characters", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107941079410794107941071",
      areaCode: "123",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe("Request body 'postalCode' parameter invalid.");
});
// areaCode field tests
test("add pilot post will pass if areaCode missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      company: "American Airlines",
      trainingFacility: "Riviera State 32/106",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  

  expect(res.status).toHaveBeenCalledWith(201);

});
test("add pilot post will pass if areaCode blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "",
      prefix: "456",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);


  expect(res.status).toHaveBeenCalledWith(201);

});
test("add pilot post fail if areaCode contains anything but numbers", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "12;",
      prefix: "436",
      suffix: "2111",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(403);
  expect(body.message).toBe(
    "Request body 'areaCode' parameter contains invalid data."
  );
});
test("add pilot post fail if areaCode length greater than 3", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "1234",
      prefix: "453",
      suffix: "2101",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(403);
  expect(body.message).toBe(
    "Request body 'areaCode' parameter contains invalid data."
  );
});
test("add pilot post fail if areaCode length of 1 or 2", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "1",
      prefix: "453",
      suffix: "2101",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(403);
  expect(body.message).toBe(
    "Request body 'areaCode' parameter contains invalid data."
  );
});
// prefix field tests
test("add pilot post will pass if prefix missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
});
test("add pilot post will pass if prefix blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "",
      suffix: "7890",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);



  expect(res.status).toHaveBeenCalledWith(201);
});
test("add pilot post fail if prefix contains anything but numbers", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "4b6",
      suffix: "2111",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(403);
  expect(body.message).toBe(
    "Request body 'prefix' parameter contains invalid data."
  );
});
test("add pilot post fail if prefix length greater than", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "4567",
      suffix: "2101",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe(
    "Request body 'prefix' parameter contains invalid data."
  );
});
test("add pilot post fail if prefix length of 1 or 2", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "45",
      suffix: "2101",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(403);
  const body = res.json.mock.calls[0][0];
  expect(body.message).toBe(
    "Request body 'prefix' parameter contains invalid data."
  );
});
// suffix field tests
test("add pilot post will pass if suffix missing", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      company: "American Airlines",
      trainingFacility: "Riviera State 32/106",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(201);

});
test("add pilot post will pass if suffix blank", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);
  
  expect(res.status).toHaveBeenCalledWith(201);

});
test("add pilot post fail if suffix contains anything but numbers", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "2A1@",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(403);
  expect(body.message).toBe("Request body 'suffix' parameter contains invalid data.");
});
test("add pilot post fail if suffix length greater than 4", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "94107",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(403);
  expect(body.message).toBe(
    "Request body 'suffix' parameter contains invalid data."
  );
});
test("add pilot post fail if suffix length is in 1-3 range", async () => {
  let req = {
    header: {},
    body: {
      crewId: 1,
      airline: "AA",
      firstName: "John",
      lastName: "Smith",
      fleet: "737",
      seat: "CPT",
      domicile: "GEG",
      trainingFacility: "Riviera State 32/106",
      company: "American Airlines",
      address1: "795 Folsom Ave",
      address2: "Suite 600",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      areaCode: "123",
      prefix: "456",
      suffix: "210",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(403);
  expect(body.message).toBe(
    "Request body 'suffix' parameter contains invalid data."
  );
});