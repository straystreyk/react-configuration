import fs from "fs";
import path from "path";
import React from "react";
import dotenv from "dotenv";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import { App } from "../src/components/app";
import { initStore, StoreStateType } from "../src/store/store";

dotenv.config();
const app = express();

const prepareSsr: (url: string) => Promise<StoreStateType> = async (
  url: string
) => {
  const state: StoreStateType = JSON.parse(
    JSON.stringify(initStore().getState())
  );

  state.counter.value = 10;

  return state;
};

app.use(express.static(path.resolve(__dirname, "../client")));
app.use("*", async (req: express.Request, res: express.Response) => {
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../client/start-page.html"),
    {
      encoding: "utf8",
    }
  );

  const preloadedState = await prepareSsr(req.originalUrl);

  const appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <Provider store={initStore(preloadedState)}>
        <App />
      </Provider>
    </StaticRouter>
  );
  indexHTML = indexHTML.replace(
    '<div id="app"></div>',
    `
      <script type="text/javascript">window._SSR_STORE_STATE_ = ${JSON.stringify(
        initStore(preloadedState).getState()
      )}; </script>
      <div id="app">${appHTML}</div>
    `
  );

  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});

// run express server
app.listen(process.env.APP_PORT, () => {
  console.log(
    `Express server started at http://localhost:${process.env.APP_PORT}`
  );
});
