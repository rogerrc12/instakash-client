import React from "react";

import classes from "./Steps.module.scss";

const Steps = (props) => {
  let classList = [];

  switch (props.step) {
    case 1:
      classList.push(classes.Step2);
      break;
    case 2:
      classList.push(classes.Step3);
      break;
    case 3:
      classList.push(classes.Step4);
      break;
    default:
      break;
  }

  return (
    <div className={classes.Steps}>
      {props.type === "cash-advance" ? (
        <>
          <h4>{props.step === 0 ? "Solicitar" : props.step === 1 ? "Cuenta para recibir" : props.step === 2 ? "Forma de pago" : "Confirmación"}</h4>
          <ul className={classList.join(" ")}>
            <li className={props.step >= 0 ? classes.Active : ""}>
              <p>Solicitar</p>
            </li>
            <li className={props.step >= 1 ? classes.Active : ""}>
              <p>Recibir</p>
            </li>
            <li className={props.step >= 2 ? classes.Active : ""}>
              <p>Pago</p>
            </li>
            <li className={props.step >= 3 ? classes.Active : ""}>
              <p>Confirmación</p>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h4>{props.step === 0 ? "Calcular" : props.step === 1 ? "Banco de origen" : "Cuenta destino"}</h4>
          <CurrencyExchangeSteps classList={classList} step={props.step} Active={classes.Active} />
        </>
      )}
    </div>
  );
};

const CurrencyExchangeSteps = (props) => {
  let classList = [classes.CurrencySteps];

  switch (props.step) {
    case 1:
      classList.push(classes.Step2);
      break;
    case 2:
      classList.push(classes.Step3);
      break;
    default:
      break;
  }

  return (
    <ul className={classList.join(" ")}>
      <li className={props.step >= 0 ? props.Active : ""}>
        <p>Calcular</p>
      </li>
      <li className={props.step >= 1 ? props.Active : ""}>
        <p>Origen</p>
      </li>
      <li className={props.step >= 2 ? props.Active : ""}>
        <p>Destino</p>
      </li>
    </ul>
  );
};

export default Steps;
