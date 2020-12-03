import React from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./Backdrop.module.scss";

const Backdrop = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={650}
      classNames="fade"
      unmountOnExit
      mountOnEnter
    >
      <div className={classes.Backdrop} onClick={props.close}></div>
    </CSSTransition>
  );
};

export default React.memo(Backdrop);
