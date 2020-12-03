import React, { useState } from "react";
import * as actions from "../../../../store/actions";
import { openNotification } from "../../../../shared/antd";
import { connect, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { signUpValues } from "../../../../shared/formValues";
import { validateSignUp } from "../../../../shared/validations.js";
import ReCAPTCHA from "react-google-recaptcha";

import Step1 from "./Step1";
import Step2 from "./Step2";

import classes from "../SignUp.module.scss";

const UserSignUp = (props) => {
  const [step, setStep] = useState(0);
  const recaptchaRef = React.createRef();

  const continueHandler = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const backHandler = () => {
    setStep((prevStep) => (prevStep === 0 ? 0 : prevStep - 1));
  };

  const onSubmit = async (values) => {
    try {
      await recaptchaRef.current.executeAsync();
      const token = await recaptchaRef.current.getValue();

      if (!token.length) {
        openNotification("error", {
          description: "Ha ocurrido un error en el captcha, por favor intenta de nuevo.",
        });
      } else {
        props.registerUser(values);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleValues = useSelector((state) => state.auth.googleRegistration);

  const steps = (props) => [<Step1 continue={continueHandler} {...props} />, <Step2 goBack={backHandler} {...props} />];

  return (
    <Formik
      initialValues={signUpValues(googleValues, "user")}
      validationSchema={validateSignUp}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isValid, values, touched, errors }) => (
        <Form className={classes.Form}>
          {steps({ isValid, values, touched, errors })[step]}
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

export default connect(null, mapDispatchToProps)(UserSignUp);
