import React from "react";

import classes from "./Square.module.scss";

const SquareButton = (props) => {
  const Icon = props.icon;

  return (
    <button
      className={classes.SquareButton + " rounded " + props.className}
      style={props.style}
      onClick={props.click}
    >
      <Icon />
    </button>
  );
};

export default SquareButton;
