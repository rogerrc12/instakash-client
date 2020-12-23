import React from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { AiFillLock } from "react-icons/ai";
import { changePasswordInit } from "../../store/actions/auth";

import PasswordInput from "../../components/AuthForm/Password";
import { validatePasswordChange } from "../../shared/validations";
import Button from "../../components/UI/Button";

import classes from "./Profile.module.scss";

const PasswordChange = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const userId = localStorage.getItem("userId");
    dispatch(changePasswordInit(values.password, userId));
  };

  return (
    <Formik initialValues={{ password: "", confirmPassword: "" }} validationSchema={validatePasswordChange} onSubmit={onSubmit}>
      {({ isValid, touched, errors }) => (
        <Form className={classes.FormChange}>
          <PasswordInput name='password' label='Contraseña' icon={AiFillLock} touched={touched.password} error={errors.password} />
          <PasswordInput name='confirmPassword' label='Confirmar Contraseña' icon={AiFillLock} touched={touched.password} error={errors.password} />
          <Button type='submit' disabled={!isValid}>
            Cambiar contraseña
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordChange;
