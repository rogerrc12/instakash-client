import React from "react";

import classes from "./SignUp.module.scss";

const ProgressBar = (props) => {
  const classList = [classes.Bar];

  if (props.type === "company") {
    classList.push(classes.BarRight);
  }

  return (
    <div className={"text-center mt-8 w-full " + classes.Toggler}>
      <div className="flex justify-around">
        <button
          onClick={() => props.toggle("user")}
          className={props.type === "user" ? classes.Active : ""}
        >
          Persona
        </button>
        <button
          onClick={() => props.toggle("company")}
          className={props.type === "company" ? classes.Active : ""}
        >
          Empresa
        </button>
      </div>
      <div className={classList.join(" ")}></div>
    </div>
  );
};

export default ProgressBar;
