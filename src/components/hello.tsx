import * as React from "react";
import { popa } from "./test.module.css";
import { Link } from "react-router-dom";

export const Hello: React.FC = () => {
  return (
    <div className={popa}>
      Hello config <Link to="/about">Go to about page</Link>
    </div>
  );
};
