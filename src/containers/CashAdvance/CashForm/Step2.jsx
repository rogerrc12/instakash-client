import React from "react";
import { connect, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import AccountTabs from "../../../components/Accounts/AccountTabs";

import Button from "../../../components/UI/Button";
import ErrorMessage from "../../../components/AuthForm/Error";

import classes from "../CashAdvance.module.scss";

const Step2 = (props) => {
  const { values } = props;

  const isLoading = useSelector((state) => state.cashAdvance.isLoading);

  const checkBalanceHandler = () => {
    props.checkBalance(values, props.goNext, "avance");
  };

  let provinceAccount;

  if (values.accountToReceive.length > 0) {
    if (
      values.idBank === 20 &&
      (values.accountToReceive.substring(0, 1) === "3" ||
        values.accountToReceive.substring(0, 1) === "6" ||
        values.accountToReceive.substring(0, 1) === "5" ||
        values.accountToReceive.substring(0, 1) === "7")
    ) {
      provinceAccount = true;
    }
  }

  return (
    <>
      <h2>
        ¿A que cuenta le gustaría recibir su <strong>dinero?</strong>
      </h2>
      <AccountTabs accounts={props.accounts} currencyToReceive={values.idCurrencyToReceive} />
      <ErrorMessage name='accountToReceive' />
      {provinceAccount && (
        <p className='alert-msg'>
          Por favor, lea nuestros{" "}
          <a href='https://instakash.net/terminos-y-condiciones' target='_blank' rel='noopener noreferrer'>
            Términos y condiciones
          </a>{" "}
          para conocer las comisiones interplaza.
        </p>
      )}
      <div className={classes.ActionWrapper}>
        <Button click={props.goBack} className={classes.PrevButton} type='button'>
          Volver
        </Button>
        <Button
          click={checkBalanceHandler}
          type='button'
          disabled={!values.accountToReceive || isLoading}
          className={`ld-over ${isLoading ? "running" : ""}`}
        >
          <span className='ld ld-ring ld-spin text-base' />
          Continuar
        </Button>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkBalance: (values, goNext, type) => dispatch(actions.checkBalanceInit(values, goNext, type)),
});

export default connect(null, mapDispatchToProps)(React.memo(Step2));
