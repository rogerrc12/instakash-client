import React from "react";

import classes from "./Options.module.scss";

const OptionsWrapper = (props) => {
  let Icon;

  if (props.icon) {
    Icon = props.icon;
  }

  return (
    <div className={classes.Container}>
      {props.image ? <img style={props.imageStyle || {}} src={props.image} alt='logo' /> : <Icon />}
      <h4>{props.title}</h4>
      <div className={classes.StepsWrapper}>{props.children}</div>
    </div>
  );
};

export default OptionsWrapper;
