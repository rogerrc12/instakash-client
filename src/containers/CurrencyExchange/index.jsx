import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions";

import Steps from "../../components/UI/Steps";
import Calculator from "./Calculator";
import AddAccountForm from "../Accounts/Form";
import UpdateProfileForm from "../Profile/UpdateProfile";
import Modal from "../../components/UI/Modal";

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
      <main>
        <div className={classes.CalculatorWrapper}>
          <div className={classes.CalculatorSection}>
            {step < 3 ? <Steps step={step} /> : null}
            <Calculator
              accounts={accounts}
              step={step}
              goNext={setNextStep}
              goBack={setPrevStep}
              goStep={goStepHandler}
              prices={prices}
              limits={limits}
              newExchange={newExchange}
              processed={processed}
              modalType={modalType}
              setModalType={setModalType}
              exchangeRateId={exchangeRateId}
            />
          </div>
          <div className={classes.InfoSection}>
            <h4>Tiempo estimado de espera</h4>
            <p>- De 15 a 20 minutos</p>
            <p className='mt-4'>
              <strong>* Solo operamos con BCP e Interbank.</strong>
            </p>
            <p>
              <strong>* Solo aceptamos transferencias bancarias.</strong>
            </p>
            <p>
              <strong>* Montos mayores a USD $5,000 pueden demorar hasta 1 hora.</strong>
            </p>
          </div>
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
