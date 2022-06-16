import * as React from "react";
import { popa } from "./test.module.css";
import { Link } from "react-router-dom";
import { StoreType } from "../store";

interface HelloProps {
  store: StoreType
}
export const Hello: React.FC<HelloProps> = ({ store }) => {
  console.log(store);

  return (
    <div className={popa}>
      color: {store.state.color}
      <br />
      Hello config <Link to="/about">Go to about page</Link>
    </div>
  );
};
