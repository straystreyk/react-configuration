import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./components/app";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Store } from "./store";

const container = document.getElementById("app");

const store = new Store(window._SSR_STORE_);
const root = ReactDOM.hydrateRoot(
  container,
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>
);
