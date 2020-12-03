import React from "react";

import classes from "./Hamburger.module.scss";

const Hamburger = (props) => {
  return (
    <button className={classes.Hamburger} onClick={props.open}>
      <span />
    </button>
  );
};

export default Hamburger;
