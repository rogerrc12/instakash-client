import React from "react";
import { useSelector } from "react-redux";
import { TiWarning } from "react-icons/ti";

import Input from "../../../components/UI/Calculator/ExchangeInput";
import Limits from "../../../components/UI/Calculator/Limits";

import Button from "../../../components/UI/Button";

import classes from "../CashAdvance.module.scss";

const Step1 = (props) => {
  const { values } = props;

  const isLoading = useSelector((state) => state.cashAdvance.isLoading);

  const amountToReceiveHandler = () => {
    if (values.amountToPay > 0) {
      const validateValues = {
        IdMoneda: values.idCurrencyToReceive,
        Monto: values.amountToPay,
      };

      props.validateLimit(validateValues, props.goNext);
    } else return;
  };

  return (
    <>
      <h2>
        Solicita dinero inmediato <br /> desde tu <strong>tarjeta de crédito</strong>.
      </h2>
      <p>Incluye la compra de nuestra guia financiera.</p>
      <Input name='amountToPay' label='Monto' />
      {props.errors.amountToPay ? (
        <span className='text-red-500 font-bold mt-1 pl-2 flex items-center' style={{ fontSize: ".82rem" }}>
          <span className='mr-2'>
            <TiWarning />
          </span>
          {props.errors.amountToPay}
        </span>
      ) : null}
      <div className={classes.ActionWrapper}>
        <Limits serviceType='avance'>
          <p>
            Se aplicarán <strong>comisiones</strong> por el uso de este servicio.
          </p>
        </Limits>
        <Button
          type='button'
          disabled={values.amountToPay < 100 || values.amountToPay > 990 || isLoading}
          click={amountToReceiveHandler}
          className={`ld-over ${isLoading ? "running" : ""}`}
        >
          <span className='ld ld-ring ld-spin text-base' />
          Continuar
        </Button>
      </div>
    </>
  );
};

export default Step1;
