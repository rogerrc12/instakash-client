import React, { useRef, useEffect } from "react";
import * as actions from "../../../store/actions";
import { useSelector, connect } from "react-redux";
import { Formik, Form } from "formik";
import { isMobile } from "react-device-detect";

import { currencyExchangeValues } from "../../../shared/formValues";
import { validateCurrencyExchange } from "../../../shared/validations";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Success from "./Success";

import classes from "../CurrencyExchange.module.scss";

const Calculator = (props) => {
  const { prices, connection } = props;

  const { accounts, step, goNext, goBack, goStep, getPrices, logout, newExchange, setModalType, exchangeRateId } = props;
  const formRef = useRef();

  const currencies = useSelector((state) => state.registration.currencies);

  let solesId;
  let dolaresId;

  if (currencies.length > 0) {
    solesId = currencies.find((c) => c.isOcode === "PEN").idCurrencyType;
    dolaresId = currencies.find((c) => c.isOcode === "USD").idCurrencyType;
  } else {
    solesId = 2;
    dolaresId = 1;
  }

  const changeConditionHandler = async (oldCondition, setField) => {
    await setField("condition", oldCondition === "buying" ? "selling" : "buying");
    const { sending, condition } = formRef.current.values;
    if (condition === "buying") {
      setField("idCurrencyToReceive", solesId);
      setField("idCurrencyToSend", dolaresId);
      setField("receiving", +sending * prices.buying);
      setField("rate", prices.buying);
    } else {
      setField("idCurrencyToReceive", dolaresId);
      setField("idCurrencyToSend", solesId);
      setField("receiving", +sending / prices.selling);
      setField("rate", prices.selling);
    }
  };

  const changeAmountHandler = (e, name, setField) => {
    const { values } = formRef.current;
    const fieldName = name === "sending" ? "receiving" : "sending";
    let fieldValue;
    if (values.condition === "buying") {
      fieldValue = name === "sending" ? +e.target.rawValue * prices.buying : +e.target.rawValue / prices.buying;
      setField(fieldName, fieldValue);
      setField("rate", prices.buying);
    } else {
      fieldValue = name === "sending" ? +e.target.rawValue / prices.selling : +e.target.rawValue * prices.selling;
      setField(fieldName, fieldValue);
      setField("rate", prices.selling);
    }
  };

  const steps = (values, valid, errors) => [
    <Step1
      getPrices={getPrices}
      next={goNext}
      prices={prices}
      changeAmount={changeAmountHandler}
      changeCondition={changeConditionHandler}
      {...values}
      errors={errors}
      setModal={setModalType}
    />,
    <Step2 prev={goBack} next={goNext} {...values} />,
    <Step3 accounts={accounts} prev={goBack} valid={valid} next={goNext} {...values} setModal={setModalType} />,
    <Success goStep={goStep} connection={connection} {...values} />,
  ];

  useEffect(() => {
    let timer;

    if (step > 0 && step < 3) timer = setTimeout(() => logout(), 300000);

    return () => clearTimeout(timer);
  }, [newExchange, goStep, step, logout]);

  const onSubmit = (values) => props.createExchange(values, goStep, connection);

  return (
    <div className={`${classes.Calculator} ${step === 3 && !isMobile ? "ml-6" : ""}`}>
      <Formik
        initialValues={currencyExchangeValues(prices.buying, solesId, dolaresId, exchangeRateId)}
        validationSchema={validateCurrencyExchange}
        innerRef={formRef}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ values, isValid, errors }) => <Form>{steps(values, isValid, errors)[step]}</Form>}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createExchange: (values, goStep, connection) => dispatch(actions.createExchangeInit(values, goStep, connection)),
  logout: () => dispatch(actions.logoutInit()),
});

export default connect(null, mapDispatchToProps)(React.memo(Calculator));
