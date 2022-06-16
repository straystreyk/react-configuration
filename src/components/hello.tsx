import * as React from "react";
import { popa } from "./test.module.css";
import { Link } from "react-router-dom";
import { StoreType } from "../store";

interface HelloProps {
  store: StoreType;
}
export const Hello: React.FC<HelloProps> = ({ store }) => {
  return (
    <>
      <h1>Hello config</h1>
      <div className={popa}>
        <p>color: {store.state.color}</p>
        <p>User id: {store.state.data.userId}</p>
        <Link to="/about">Go to about page</Link>
      </div>
    </>
  );
};
