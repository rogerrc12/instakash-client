import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import Button from "../UI/Button";

import classes from "./WrapperButtons.module.scss";

const WrapperButtons = (props) => {
  let continueBtn = (
    <Button
      type="submit"
      className={`${classes.Continue} ld-over ${props.isLoading ? "running" : ""}`}
      disabled={!props.isValid || props.isLoading}
    >
      <span className="ld ld-ring ld-spin text-base" />
      Registarme
    </Button>
  );

  if (props.continue) {
    continueBtn = (
      <Button
        type="button"
        className={classes.Continue + " flex items-center"}
        disabled={!props.isValid}
        click={props.continueHandler}
      >
        Continuar{" "}
        <span className="ml-2">
          <FiArrowRight />
        </span>
      </Button>
    );
  }

  return (
    <div className={classes.ButtonsWrapper + " flex justify-between items-center mt-8"}>
      <Button type="button" className={classes.Previous + " flex items-center"} click={props.previousHandler}>
        <span className="mr-2">
          <FiArrowLeft />
        </span>{" "}
        Atrás
      </Button>
      {continueBtn}
    </div>
  );
};

export default WrapperButtons;
