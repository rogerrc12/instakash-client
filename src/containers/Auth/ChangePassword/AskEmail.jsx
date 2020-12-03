import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { FaRegEnvelope } from "react-icons/fa";
import { validateEmail } from "../../../shared/validations";

import Input from "../../../components/AuthForm/Input";
import Button from "../../../components/UI/Button";

import classes from "../Auth.module.scss";

const AskEmail = (props) => {
  const onSubmit = (values) => {
    props.sendPasswordEmail(values.Email);
  };

  return (
    <>
      <p className="mb-4 mt-1 text-xs text-center">
        Te enviaremos un correo para que puedas restablecer tu contraseña. <br />{" "}
        <strong>Recuerda revisar tu carpeta de spam.</strong>
      </p>
      <p>
        ¿Ya la recordaste?
        <Link to="/login" className="ml-2">
          Inicia Sesión
        </Link>
      </p>
      <div className={classes.AuthForm}>
        <Formik initialValues={{ Email: "" }} validationSchema={validateEmail} onSubmit={onSubmit}>
          {({ isValid, errors, touched }) => (
            <Form>
              <Input
                type="email"
                name="Email"
                label="Tu correo"
                touched={touched.Email}
                error={errors.Email}
                icon={FaRegEnvelope}
              />
              <Button
                type="submit"
                disabled={!isValid}
                className={`w-full mt-3 ld-over ${props.isLoading ? "running" : ""}`}
              >
                <span className="ld ld-ring ld-spin text-base" />
                Enviar correo
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default React.memo(AskEmail);
