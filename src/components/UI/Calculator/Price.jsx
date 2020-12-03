import React from "react";

import classes from "./Calculator.module.scss";

const Price = (props) => {
  return (
    <div className={classes.Price}>
      <h4>{props.label}</h4>
      <p>
        S/. <span>{props.price}</span>
      </p>
    </div>
  );
};

export default Price;
