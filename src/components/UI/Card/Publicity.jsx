import React from "react";
import { FiArrowRight } from "react-icons/fi";

import SquareButton from "../SquareButton";

import classes from "./Card.module.scss";

const Publicity = (props) => {
  return (
    <div className={classes.PublicityCard + " px-3 py-4 rounded-lg mt-auto"}>
      <SquareButton icon={FiArrowRight} className={classes.Arrow} />
      {props.children}
      <img src={props.image} alt="publicidad" />
    </div>
  );
};

export default Publicity;
