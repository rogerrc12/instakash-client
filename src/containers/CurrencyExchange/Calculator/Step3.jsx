import React from "react";
import { useSelector } from "react-redux";
import AccountTabs from "../../../components/Accounts/AccountTabs";

import Button from "../../../components/UI/Button";
import ErrorMessage from "../../../components/AuthForm/Error";

import classes from "../CurrencyExchange.module.scss";

const Step3 = (props) => {
  const isLoading = useSelector((state) => state.currencyExchange.isLoading);

  let provinceAccount;

  if (props.accountToReceive.length > 0) {
    if (
      props.idBank === 20 &&
      (props.accountToReceive.substring(0, 1) === "3" ||
        props.accountToReceive.substring(0, 1) === "6" ||
        props.accountToReceive.substring(0, 1) === "5" ||
        props.accountToReceive.substring(0, 1) === "7")
    ) {
      provinceAccount = true;
    }
  }

  console.log(isLoading);

  return (
    <>
      <h2>
        ¿En que cuenta desea recibir su <strong>cambio?</strong>
      </h2>
      <AccountTabs accounts={props.accounts} currencyToReceive={props.idCurrencyToReceive} setModal={props.setModal} />
      <ErrorMessage name='accountToReceive' />
      {provinceAccount && (
        <p className='error-msg'>
          Transferencias interplazas por interbank acarrean una comisión, por favor lea nuestros{" "}
          <a href='https://instakash.net/terminos-y-condiciones' target='_blank' rel='noopener noreferrer'>
            Términos y Condiciones
          </a>{" "}
          para conocer las comisiones interplaza.
        </p>
      )}
      <div className={classes.ActionWrapper}>
        <Button click={props.prev} className={classes.PrevButton} type='button'>
          Volver
        </Button>
        <Button type='submit' disabled={!props.accountToReceive || isLoading} className={`ld-over ${isLoading ? "running" : ""}`}>
          <span className='ld ld-ring ld-spin text-base' />
          Crear cambio
        </Button>
      </div>
    </>
  );
};

export default React.memo(Step3);
