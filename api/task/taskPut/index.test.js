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

test("task update put returns a successful status if updated", async () => {
  let req = {
    header: {},
    body: {
      id: 1,
      title: "Task 1 updated",
      state: "TASK_PINNED",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(204);
});

test("task update put fail if body not found", async () => {
  let req = {
    header: {},
    
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing");
});

test("task update put fail if id is not found", async () => {
  let req = {
    header: {},
    body: {}
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'id' property");
});
test("task update put fail if title is not found", async () => {
  let req = {
    header: {},
    body: {
      id: 1
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'title' property");
});
test("task update put fail if state is not found", async () => {
  let req = {
    header: {},
    body: {
      id: 1,
      title: "TASK 1 updated",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  const body = res.json.mock.calls[0][0];

  expect(res.status).toHaveBeenCalledWith(406);
  expect(body.message).toBe("Request body missing 'state' property");
});

test("task update put returns a successful status if updated", async () => {
  let req = {
    header: {},
    body: {
      id: 1,
      title: "Task 1 updated",
      state: "TASK_PINNED",
    },
  };
  let res = makeMockRes();

  await func.inject({
    knex: mock.knex,
  })(req, res);

  expect(res.status).toHaveBeenCalledWith(204);
});
