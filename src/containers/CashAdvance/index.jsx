import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions";

import Steps from "../../components/UI/Steps";
import AddAccountForm from "../Accounts/Form";
import Modal from "../../components/UI/Modal";
import CashForm from "../CashAdvance/CashForm";

import AdvanceSteps from "../../assets/images/illustrations/advance-steps.svg";
import classes from "./CashAdvance.module.scss";

const CashAdvance = (props) => {
  const user = useSelector((state) => state.auth.user);
  const accounts = useSelector((state) => state.accounts);

  const { getLimits } = props;
  const [step, setStep] = useState(0);

  useEffect(() => {
    getLimits();
  }, [getLimits]);

  if (user.rucNumber && !user.address) return <Redirect exact from={props.match.url} to='/mi-perfil' />;

  const setNextStep = () => setStep((prevStep) => prevStep + 1);
  const setPrevStep = () => setStep((prevStep) => (prevStep < 1 ? 0 : prevStep - 1));
  const goStepHandler = (step) => setStep(step);

  return (
    <>
      <main>
        <div className={classes.CashAdvanceWrapper}>
          {step < 4 ? <Steps step={step} type='cash-advance' /> : null}
          <div className={classes.CashFormWrapper}>
            <CashForm step={step} accounts={accounts} goNext={setNextStep} goBack={setPrevStep} goStep={goStepHandler} />
          </div>
        </div>
      </main>
      <Modal animationClassName='slide-up-down'>
        <AddAccountForm formType='agregar' isThird={accounts.isThird} currency={accounts.currency} />
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getLimits: () => dispatch(actions.getLimitsInit()),
});

export default connect(null, mapDispatchToProps)(CashAdvance);
