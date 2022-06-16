import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { StoreType } from "../store";
import { Hello } from "./hello";

interface AppProps {
  store: StoreType
}

export const App: React.FC<AppProps> = ({ store }) => {
  return (
    <Routes>
      <Route path="/" element={<Hello store={store} />} />
      <Route path="/about" element={<div>Initial simple config</div>} />
    </Routes>
  );
};
