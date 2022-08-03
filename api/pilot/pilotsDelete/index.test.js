const path = require("path");
const func = require("./index");

const makeMockKnex = require("../../../helpers/makeMockKnex");
const makeMockRes = require("../../../utils/makeMockRes");

let mock = null;

beforeEach(async () => {
  mock = await makeMockKnex({
    testPath: path.join(__dirname, "..", "_test", "temp"),
    snapshot: path.join(__dirname, "..", "_test", "snapshot"),
  });
});

afterEach(async () => {
  await mock.clean();
});

test("pilots delete returns 404 if pilot crewId doesn't exist", async () => {
  let req = {
    header: {},
    params: {crewId: 1000}
    
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});
test("pilots delete returns 204 if pilot deleted", async () => {
  let req = {
    header: {},
    params: {crewId: 1}
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(204);
});
test("pilots delete returns 406 if param is not parsable to an int", async () => {
  let req = {
    header: {},
    params: { crewId: '%' },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(406);
});
