import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { Tooltip } from "antd";

import classes from "./Calculator.module.scss";

const Limits = (props) => {
  return (
    <div className="flex items-center">
      <Tooltip
        title={`${
          props.serviceType === "avance"
            ? "Este servicio será registrado en su tarjeta de crédito como una compra."
            : "Contáctanos para una tasa prefernecial vía whatsapp o por correo a contacto@instakash.net. Consulta con tu banco si puedes hacer operaciones de altos montos."
        }`}
        color="#028090"
      >
        <BsQuestionCircle />
      </Tooltip>
      <div className={classes.PriceDivider} style={{ height: "35px" }} />
      {props.children}
    </div>
  );
};

export default Limits;
