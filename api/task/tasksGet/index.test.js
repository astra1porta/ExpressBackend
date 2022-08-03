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

test("task all get returns a successful status with five tasks ", async () => {
  let req = {
    header: {},
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(body.length).toBe(5);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(body).toEqual([
    { id: 1, title: "Task 1", state: "TASK_INBOX" },
    { id: 2, title: "Task 2", state: "TASK_INBOX" },
    { id: 3, title: "Task 3", state: "TASK_INBOX" },
    { id: 4, title: "Task 4", state: "TASK_PINNED" },
    { id: 5, title: "Task 5", state: "TASK_ARCHIVED" },
  ]);
});
