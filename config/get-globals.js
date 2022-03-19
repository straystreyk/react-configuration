const dotenv = require("dotenv");
dotenv.config();

const globals = {};

const getGlobals = () => {
  if (process.env.APP_IP) globals.APP_IP = process.env.APP_IP;
  return globals;
};

module.exports = { getGlobals };
