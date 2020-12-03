import React from "react";
import { Formik, Form } from "formik";
import { AiFillLock } from "react-icons/ai";

import PasswordInput from "../../components/AuthForm/Password";
import { validatePasswordChange } from "../../shared/validations";
import Button from "../../components/UI/Button";

import classes from "./Profile.module.scss";

const PasswordChange = () => {
  return (
    <Formik initialValues={{ password: "", confirmPassword: "" }} validationSchema={validatePasswordChange}>
      {({ isValid, touched, errors }) => (
        <Form className={classes.FormChange}>
          <PasswordInput
            name="password"
            label="Contraseña"
            icon={AiFillLock}
            touched={touched.password}
            error={errors.password}
          />
          <PasswordInput
            name="confirmPassword"
            label="Confirmar Contraseña"
            icon={AiFillLock}
            touched={touched.password}
            error={errors.password}
          />
          <Button type="submit" disabled={!isValid}>
            Cambiar contraseña
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordChange;
