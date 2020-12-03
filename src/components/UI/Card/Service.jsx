import React from "react";
import { FiArrowRight } from "react-icons/fi";

import SquareButton from "../SquareButton";

import classes from "./Card.module.scss";

const Service = (props) => {
  return (
    <div className={classes.ServiceCard + " px-4 md:p-6 rounded-lg"}>
      <div className={classes.CardDesc}>{props.children}</div>
      <img style={props.style} src={props.image} alt={props.title} />
      <SquareButton icon={FiArrowRight} className={classes.Arrow} />
    </div>
  );
};

export default Service;
