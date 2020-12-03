import React from "react";
import { useSelector } from "react-redux";
import { banksList } from "../../../shared/utils";

import Input from "../../../components/UI/Form/FloatedLabel";
import Button from "../../../components/UI/Button";
import ErrorMessage from "../../../components/AuthForm/Error";
import Checkbox from "../../../components/AuthForm/Checkbox";

import classes from "../CurrencyExchange.module.scss";

const Step3 = (props) => {
  const banks = useSelector((state) => state.registration.accountBanks);
  let fundsDeclaration;

  if ((props.sending > 9999 && props.idCurrencyToSend === 1) || (props.sending > 29999 && props.idCurrencyToSend === 2)) {
    fundsDeclaration = (
      <>
        <Input name='originFunds' label='Origen de tus fondos' type='text' className='mr-0' value={props.originFunds} />
        <Input name='destinationFunds' label='Destino de tus fondos' type='text' className='mr-0' value={props.destinationFunds} />
        <Checkbox name='acceptFunds' className='flex items-center cursor-pointer text-base ml-3'>
          <strong>Manifiesto que el origen y destino de los fondos declarados son legítimos.</strong>
        </Checkbox>
        <ErrorMessage name='acceptFunds' />
      </>
    );
  }

  return (
    <>
      <h2 className='mb-4'>
        ¿Desde que <strong>banco</strong> nos envia su dinero?
      </h2>
      <Input
        type='select'
        name='bankToSend'
        options={banksList(banks)}
        placeholder='Banco a enviar'
        className='w-full'
        withIcon
        value={props.bankToSend}
      />
      <ErrorMessage name='bankToSend' />

      {fundsDeclaration}

      <div className={classes.ActionWrapper}>
        <Button click={props.prev} className={classes.PrevButton} type='button'>
          Volver
        </Button>
        <Button
          click={props.next}
          type='button'
          disabled={!props.bankToSend || fundsDeclaration ? !props.originFunds || !props.destinationFunds || !props.acceptFunds : false}
        >
          Continuar
        </Button>
      </div>
    </>
  );
};

export default Step3;
