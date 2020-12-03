import React from "react";
import { useSelector } from "react-redux";

import Button from "../../../components/UI/Button";
import Checkbox from "../../../components/AuthForm/Checkbox";

import classes from "../CashAdvance.module.scss";

const Confirmation = (props) => {
  const { values } = props;
  const { paymentBanks, accountBanks, currencies } = useSelector((state) => state.registration);
  const isLoading = useSelector((state) => state.cashAdvance.isLoading);
  const bankToReceive = accountBanks.find((b) => b.idBank === values.idBank);
  const currency = currencies.find((currency) => currency.idCurrencyType === values.idCurrencyToReceive);

  const selectedBank = paymentBanks.find((bank) => bank.idBank === values.IdPayingBank);

  return (
    <>
      <p className='mt-3'>Por favor revise los detalles de su avance.</p>
      <div className={classes.Details}>
        <div className='flex items-center justify-between'>
          <h3>Detalles del pago</h3>
          <Button type='button' click={() => props.goStep(1)}>
            Editar
          </Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Cantidad solicitada:</p>
          <p>
            <strong>{currency.symbol + " " + values.amountToPay.toFixed(2)}</strong>
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Forma de pago:</p>
          <p>
            <strong>Tarjeta de crédito {selectedBank.name}</strong>
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Compra de guia:</p>
          <p>
            <strong>{currency.symbol + " " + (values.amountToPay - values.amountToReceive).toFixed(2)}</strong>
          </p>
        </div>
      </div>

      <div className={classes.Details}>
        <div className='flex items-center justify-between'>
          <h3>Detalles de su avance</h3>
          <Button type='button' click={() => props.goStep(0)}>
            Editar
          </Button>
        </div>
        <div className='flex items-center justify-between'>
          <p>Total de su devolución:</p>
          <p>
            <strong>{currency.symbol + " " + values.amountToReceive.toFixed(2)}</strong>
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Banco a recibir avance:</p>
          <p className='flex items-center'>
            <img src={"data:image/png;base64," + bankToReceive.image} alt={bankToReceive.name} className='mr-2' />
            <strong>- termina en {values.accountToReceive.substring(values.accountToReceive.length - 4, values.accountToReceive.length)}</strong>
          </p>
        </div>
      </div>
      <Checkbox name='accept' className='flex items-center cursor-pointer text-base ml-3'>
        <strong>Confirmo que la información mostrada es correcta.</strong>
      </Checkbox>
      <div className={classes.ActionWrapper}>
        <Button click={props.goBack} className={classes.PrevButton} type='button'>
          Volver
        </Button>
        <Button type='submit' disabled={!props.isValid || isLoading} className={`ld-over ${isLoading ? "running" : ""}`}>
          <span className='ld ld-ring ld-spin text-base' />
          Aceptar
        </Button>
      </div>
    </>
  );
};

export default Confirmation;
