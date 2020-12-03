import React from "react";
import { connect, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Formik, Form } from "formik";
import { FiSmartphone } from "react-icons/fi";

import { validatePhoneNumber } from "../../shared/validations";
import Input from "../../components/AuthForm/Input";
import Button from "../../components/UI/Button";

import classes from "./Profile.module.scss";

const PhoneNumberChange = (props) => {
  const onSubmit = (values) => props.changePhoneNumber(values.PhoneNumber);
  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <Formik initialValues={{ PhoneNumber: "" }} validationSchema={validatePhoneNumber} onSubmit={onSubmit}>
      {({ isValid, touched, errors }) => (
        <Form className={classes.FormChange}>
          <Input
            label="Número de teléfono"
            icon={FiSmartphone}
            touched={touched.PhoneNumber}
            error={errors.PhoneNumber}
            name="PhoneNumber"
          />
          <Button type="submit" disabled={!isValid} className={`w-full mt-3 ld-over ${isLoading ? "running" : ""}`}>
            <span className="ld ld-ring ld-spin text-base" />
            Agregar teléfono
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changePhoneNumber: (phone) => dispatch(actions.changePhoneNumberInit(phone)),
});

export default connect(null, mapDispatchToProps)(PhoneNumberChange);
