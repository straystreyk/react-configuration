import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./components/app";

import "./index.css";

// if without SSR
const container = document.getElementById("app");
const root = ReactDOM.hydrateRoot(container, <App />);

// if with SSR
// const container = document.getElementById("app");
// const root = ReactDOM.hydrateRoot(container, <App />);
//
// root.render()
