import React from "react";

import classes from "./CustomButton.module.scss";

const CustomButton = (props) => {
  return (
    <div className={`${classes.CustomButton} ${props.active ? classes.Active : ""} ${props.className}`} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default CustomButton;
