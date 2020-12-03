import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Formik, Form } from "formik";
import { cashAdvanceValues } from "../../../shared/formValues";
import { validateCashAdvance } from "../../../shared/validations";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Confirmation from "./Confirmation";
import Success from "./Success";

const CashForm = (props) => {
  const { step, accounts, goNext, goBack, goStep, validateLimit, getBanks } = props;
  const { limits, rate } = useSelector((state) => state.cashAdvance);

  useEffect(() => {
    getBanks();
  }, [getBanks]);

  const steps = (props) => [
    <Step1 {...props} rate={rate} goNext={goNext} validateLimit={validateLimit} />,
    <Step2 accounts={accounts} {...props} goBack={goBack} goNext={goNext} />,
    <Step3 {...props} goBack={goBack} goNext={goNext} />,
    <Confirmation {...props} rate={rate} goBack={goBack} goStep={goStep} />,
    <Success {...props} goStep={goStep} />,
  ];

  const onSubmit = (values) => props.createAdvance(values, goStep);

  return (
    <div className='relative'>
      <Formik initialValues={cashAdvanceValues} enableReinitialize validationSchema={validateCashAdvance(limits.soles)} onSubmit={onSubmit}>
        {(props) => <Form>{steps(props)[step]}</Form>}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getBanks: () => dispatch(actions.getBanksInit()),
  createAdvance: (values, goStep) => dispatch(actions.createAdvanceInit(values, goStep)),
  validateLimit: (values, goNext) => dispatch(actions.validateLimitInit(values, goNext)),
});

export default connect(null, mapDispatchToProps)(CashForm);
