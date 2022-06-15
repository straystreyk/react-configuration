import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Hello } from "./hello";

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/about" element={<div>Initial simple config</div>} />
    </Routes>
  );
};
