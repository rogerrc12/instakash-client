import React from "react";
import { Formik, Form } from "formik";
import { FiLock } from "react-icons/fi";
import { validatePasswordChange } from "../../../shared/validations";

import InputPassword from "../../../components/AuthForm/Password";
import Button from "../../../components/UI/Button";

import classes from "../Auth.module.scss";

const PasswordForm = (props) => {
  const onSubmit = (values) => props.changePassword(values.password, props.userId);

  return (
    <>
      <div className={classes.AuthForm}>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validatePasswordChange}
          onSubmit={onSubmit}
        >
          {({ isValid, errors, touched }) => (
            <Form>
              <InputPassword
                name="password"
                label="Contraseña"
                icon={FiLock}
                touched={touched.password}
                error={errors.password}
              />
              <InputPassword
                name="confirmPassword"
                label="Confirmar contraseña"
                icon={FiLock}
                touched={touched.confirmPassword}
                error={errors.confirmPassword}
              />
              <Button
                type="submit"
                disabled={!isValid}
                className={`w-full mt-3 ld-over ${props.isLoading ? "running" : ""}`}
              >
                <span className="ld ld-ring ld-spin text-base" />
                Cambiar contraseña
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default PasswordForm;
