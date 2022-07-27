import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { initStore } from "./store/store";

import "./index.css";

const container = document.getElementById("app");

const root = ReactDOM.hydrateRoot(
  container,
  <BrowserRouter>
    <Provider store={initStore(window._SSR_STORE_STATE_)}>
      <App />
    </Provider>
  </BrowserRouter>
);
