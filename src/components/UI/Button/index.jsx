import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      className={
        classes.Button + " " + props.className + " py-3 px-6 rounded-lg"
      }
      disabled={props.disabled}
      onClick={props.click}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  click: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

export default Button;
