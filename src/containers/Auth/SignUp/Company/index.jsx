import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { Formik, Form } from "formik";
import { openNotification } from "../../../../shared/antd";

import { signUpValues } from "../../../../shared/formValues";
import { validateSignUp } from "../../../../shared/validations";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import ReCAPTCHA from "react-google-recaptcha";

import classes from "../SignUp.module.scss";

const CompanySIgnUp = (props) => {
  const [step, setStep] = useState(0);
  const recaptchaRef = React.createRef();

  const continueHandler = () => setStep((prevStep) => prevStep + 1);
  const previousHandler = () => setStep((prevStep) => (prevStep === 0 ? 0 : prevStep - 1));

  const steps = (props) => [
    <Step1 {...props} continue={continueHandler} />,
    <Step2 {...props} continue={continueHandler} goBack={previousHandler} />,
    <Step3 {...props} goBack={previousHandler} />,
  ];

  const onSubmit = async (values) => {
    await recaptchaRef.current.executeAsync();
    const token = await recaptchaRef.current.getValue();

    if (!token.length) {
      openNotification("error", {
        description: "Parece que ha ocurrido un error en el captcha, intenta de nuevo.",
      });
    } else {
      props.registerUser(values);
    }
  };

  return (
    <Formik initialValues={signUpValues(null, "company")} validationSchema={validateSignUp} onSubmit={onSubmit}>
      {({ values, errors, touched, isValid }) => (
        <Form className={classes.Form}>
          {steps({ values, errors, touched, isValid })[step]}
          <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey="6LcCE8EZAAAAAOw3UIrXoNtiZeGTfn1eF54-nQ0K" />
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (values) => dispatch(actions.registerUserInit(values)),
  };
};

export default connect(null, mapDispatchToProps)(CompanySIgnUp);
