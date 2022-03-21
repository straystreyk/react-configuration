const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const stats = require("./config/build-stats.json");

const ejsTemplatePath = path.resolve(__dirname, "config", "index_template.ejs");
const htmlFilePath = path.resolve(__dirname, "build", "index.html");
const globals = {
  APP_IP: process.env.APP_IP,
};

ejs.renderFile(ejsTemplatePath, { ...stats, globals }, (err, str) => {
  if (err) return console.log(err);
  fs.writeFileSync(htmlFilePath, str);
});
