import React from "react";

import logoPng from "./assets/euskadi.png";
import { ReactComponent as Logo } from "./assets/reactLogo.svg";

import s from "./App.module.scss";
console.log(s);
export const App = () => {
  return (
    <div>
      <h1 className={s.root}>Euskadi</h1>
      <img src={logoPng} alt="Euskal herria" />
      <Logo />
    </div>
  );
};
