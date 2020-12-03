import React from "react";
import { useSelector } from "react-redux";

import Button from "../../../components/UI/Button";
import Checkbox from "../../../components/AuthForm/Checkbox";
import ErrorMessage from "../../../components/AuthForm/Error";

import classes from "../CurrencyExchange.module.scss";

const Confirmation = (props) => {
  const banks = useSelector((state) => state.registration.accountBanks);
  const isLoading = useSelector((state) => state.currencyExchange.isLoading);

  const bankToSend = banks.find((b) => b.idBank === props.bankToSend);
  const bankToReceive = banks.find((b) => b.idBank === props.idBank);

  return (
    <>
      <p className='mt-3'>Por favor revise los detalles de su cambio.</p>
      <div className={classes.Details}>
        <div className='flex items-center justify-between'>
          <h3>Detalles de transferencia</h3>
          <Button type='button' click={() => props.goStep(2)}>
            Editar
          </Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Cantidad a enviar:</p>
          <p>
            <strong>
              {props.condition === "buying" ? "$" : "S/."} {props.sending.toFixed(2)}
            </strong>
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Banco a transferir:</p>
          <p className='flex items-center'>
            <img src={"data:image/png;base64," + bankToSend.image} alt={bankToSend.name} />
            <strong className='ml-3'>{bankToSend.name}</strong>
          </p>
        </div>
      </div>
      <div className={classes.Details}>
        <div className='flex items-center justify-between'>
          <h3>Detalles de recepción</h3>
          <Button type='button' click={() => props.goStep(1)}>
            Editar
          </Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Cantidad a recibir:</p>
          <p>
            <strong>
              {props.condition === "buying" ? "S/." : "$"} {props.receiving.toFixed(2)}
            </strong>
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Cuenta a abonar:</p>
          <p className='flex items-center'>
            <img src={"data:image/png;base64," + bankToReceive.image} alt={bankToReceive.name} />
            <strong className='ml-3'>
              termina en {props.accountToReceive.substring(props.accountToReceive.length - 4, props.accountToReceive.length)}
            </strong>
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Tasa de cambio:</p>
          <p>
            <strong>S/. {props.rate}</strong>
          </p>
        </div>
      </div>
      {props.condition === "selling" && +props.receiving > 4999 ? (
        <small className={classes.Warning}>Los montos mayores a $ 5.000 demoran entre 25-45 minutos.</small>
      ) : null}
      <Checkbox name='accept' className='flex items-center cursor-pointer text-base ml-3'>
        <strong>Confirmo que la información mostrada es correcta.</strong>
      </Checkbox>
      <ErrorMessage name='accept' />
      <div className={classes.ActionWrapper}>
        <Button click={props.prev} className={classes.PrevButton} type='button'>
          Volver
        </Button>
        <Button type='submit' disabled={!props.valid} className={`ld-over ${isLoading ? "running" : ""}`}>
          <span className='ld ld-ring ld-spin text-base' />
          Aceptar
        </Button>
      </div>
    </>
  );
};

export default Confirmation;
