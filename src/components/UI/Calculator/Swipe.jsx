import React from "react";
import { TiArrowSync } from "react-icons/ti";

import classes from "./Calculator.module.scss";

const Swipe = (props) => {
  const classList = [classes.Swipe];

  if (props.condition === "selling") {
    classList.push(classes.Selling);
  } else {
    classList.push(classes.Buying);
  }

  return (
    <div
      role="button"
      style={{ cursor: props.disabled ? "not-allowed" : "pointer" }}
      tabIndex={0}
      onClick={props.change}
      className={classList.join(" ")}
    >
      <TiArrowSync />
    </div>
  );
};

export default Swipe;
