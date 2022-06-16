import fs from "fs";
import path from "path";
import React from "react";
import dotenv from "dotenv";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Store, StoreType } from "../src/store";
import { App } from "../src/components/app";

dotenv.config();
const app = express();

const prepareSsr = async (store: StoreType, url: string) => {
  store.state.color = "blue";

  if (url === "/") {
    store.state.data = { userId: 1 };
  }
};

app.use(express.static(path.resolve(__dirname, "../client")));
app.use("*", async (req: express.Request, res: express.Response) => {
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../client/start-page.html"),
    {
      encoding: "utf8",
    }
  );

  const store = new Store();
  await prepareSsr(store, req.originalUrl);

  const appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <App store={store} />
    </StaticRouter>
  );
  indexHTML = indexHTML.replace(
    '<div id="app"></div>',
    `
      <script type="text/javascript">window._SSR_STORE_ = ${JSON.stringify(
        store.state
      )}; </script>
      <div id="app">${appHTML}</div>
    `
  );

  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});

// run express server on port 9000
app.listen(process.env.APP_PORT, () => {
  console.log(
    `Express server started at http://localhost:${process.env.APP_PORT}`
  );
});
