import React from "react";

import logoPng from "./assets/euskadi.png";
import { ReactComponent as Logo } from "./assets/reactLogo.svg";
export const App = () => {
  return (
    <div>
      <h1>Euskadi</h1>
      <img src={logoPng} alt="Euskal herria" />
      <Logo />
    </div>
  );
};
