require("dotenv").config();
const { get } = require("env-var");

const envs = {
  port: get("PORT").required().asPortNumber(),
  user: get("MONGO_USER").required().asString(),
  pass: get("MONGO_PASS").required().asString(),
};

module.exports = { envs };
