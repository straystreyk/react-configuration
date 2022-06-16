const dotenv = require("dotenv");
dotenv.config();

const globals = {};

const getGlobals = () => {
  if (process.env.APP_PORT) globals.APP_PORT = process.env.APP_PORT;
  return globals;
};

module.exports = { getGlobals };
