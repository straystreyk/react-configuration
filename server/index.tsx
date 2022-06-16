import { Store, StoreType } from "../src/store";

const express = require("express");
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter } = require("react-router-dom/server");
const { App } = require("../src/components/app.tsx");

const app = express();

const prepareSsr = async (store: StoreType) => {
  store.state.color = 'blue'
}

app.use(express.static(path.resolve(__dirname, "../client")));
app.use("*", async (req, res) => {
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../client/start-page.html"),
    {
      encoding: "utf8",
    }
  );

  const store = new Store()
  await prepareSsr(store)

  const appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <App store={store} />
    </StaticRouter>
  );
  indexHTML = indexHTML.replace(
    '<div id="app"></div>',
    `
      <script type="text/javascript">window._SSR_STORE_ = ${JSON.stringify(store.state)}; </script>
      <div id="app">${appHTML}</div>
    `
  );

  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});

// run express server on port 9000
app.listen("9000", () => {
  console.log("Express server started at http://localhost:9000");
});
