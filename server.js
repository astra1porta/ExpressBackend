const express = require("express");
const YAML = require("js-yaml");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const findRoutes = require("./helpers/findRoutes");
const mountRoute = require("./helpers/mountRoute");

const app = express();
const PORT = process.env.PORT || 3750;

// Accept incomming data
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json()); 
// CORS
app.use(cors());

// Routes

const { routes } = YAML.load(fs.readFileSync("./api/routes.yaml"));

routes.forEach((route) => {
  const routeDir = path.join(__dirname, "api", route.path);

  findRoutes(routeDir).forEach((fn) => {
    mountRoute(app, route.prefix, fn);
  });
});

app.get("/", (req, res) => {
  return res.status(200).send("");
});

app.listen(3750, () => {
  console.log(`Listening on localhost: ${PORT}`);
});
