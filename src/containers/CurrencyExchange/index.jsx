import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions";

import Steps from "../../components/UI/Steps";
import Calculator from "./Calculator";
import AddAccountForm from "../Accounts/Form";
import UpdateProfileForm from "../Profile/UpdateProfile";
import Modal from "../../components/UI/Modal";

import ExchangeSteps from "../../assets/images/illustrations/currency-steps.svg";
import ExchangeSuccess from "../../assets/images/illustrations/transaction-success.svg";
import classes from "./CurrencyExchange.module.scss";

const CurrencyExchange = (props) => {
  const { getPrices } = props;
  const [modalType, setModalType] = useState("profile");
  const [step, setStep] = useState(0);

  useEffect(() => {
    getPrices();
  }, [getPrices]);

  const setNextStep = () => setStep((prevStep) => prevStep + 1);
  const setPrevStep = () => setStep((prevStep) => (prevStep < 1 ? 0 : prevStep - 1));
  const goStepHandler = (step) => setStep(step);

  const accounts = useSelector((state) => state.accounts);
  const { prices, limits, newExchange, processed, exchangeRateId } = useSelector((state) => state.currencyExchange);

  const user = useSelector((state) => state.auth.user);
  if (!user.phoneNumber || (user.rucNumber && !user.address)) return <Redirect exact from={props.match.url} to='/mi-perfil' />;

  return (
    <>
      <main className={classes.CurrencyExchange}>
        <div className={classes.CalculatorWrapper}>
          {step < 3 ? <Steps step={step} /> : null}
          <Calculator
            accounts={accounts}
            step={step}
            goNext={setNextStep}
            goBack={setPrevStep}
            goStep={goStepHandler}
            prices={prices}
            limits={limits}
            comisiones={comisiones}
            newExchange={newExchange}
            processed={processed}
            modalType={modalType}
            setModalType={setModalType}
            exchangeRateId={exchangeRateId}
          />
        </div>
      </main>
      <Modal animationClassName='slide-up-down'>
        {modalType === "account" ? (
          <AddAccountForm formType='agregar' isThird={accounts.isThird} currency={accounts.currency} />
        ) : (
          <UpdateProfileForm updateProfile={props.updateProfile} />
        )}
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (values) => dispatch(actions.updateProfileInit(values)),
    getPrices: () => dispatch(actions.getPricesInit()),
  };
};

export default connect(null, mapDispatchToProps)(CurrencyExchange);
