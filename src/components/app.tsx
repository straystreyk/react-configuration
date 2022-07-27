import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Test } from "./test";

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
    </Routes>
  );
};
