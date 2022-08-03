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

test("pilots get method returns one record", async() => {
  let req = {
    header: {}
  }
  let res = makeMockRes();

  await func.inject({
    knex:mock.knex,
  
  })(req, res);

  const body = res.json.mock.calls[0][0];
  
  expect(body.length).toBe(1);
  expect(res.status).toHaveBeenCalledWith(200);
});