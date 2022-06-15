import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./components/app";

import "./index.css";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("app");
const root = ReactDOM.hydrateRoot(
  container,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
