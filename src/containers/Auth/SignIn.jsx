import React from "react";
import { connect, useSelector } from "react-redux";
import { signInValues } from "../../shared/formValues";
import { validateSignIn } from "../../shared/validations";
import * as actions from "../../store/actions";
import { Formik, Form } from "formik";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import Logo from "../../components/UI/Logo";
import Input from "../../components/AuthForm/Input";
import InputPassword from "../../components/AuthForm/Password";
import Button from "../../components/UI/Button";

import classes from "./Auth.module.scss";

const SignIn = (props) => {
  const onSubmit = (values) => props.loginUser(values);

  const onGoogleLogin = (response) => {
    if (!response.tokenId) return null;
    props.loginGoogle(response.tokenId);
  };

  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <section ref={props.forwardRef} className={classes.AuthWrapper + " p-8 md:p-0 md:py-6"}>
      <Logo color className="mb-6" />
      <h2 className="mb-4 md:mb-2">¡Bienvenido a Instakash!</h2>
      <p>
        ¿Eres nuevo en Instakash?
        <button onClick={props.showSignUp} className="ml-2">
          registrate
        </button>
      </p>
      <div className={classes.AuthForm}>
        <Formik initialValues={signInValues} validationSchema={validateSignIn} onSubmit={onSubmit}>
          {({ isValid, touched, errors }) => (
            <Form>
              <Input type="email" name="Email" label="Correo" touched={touched.Email} error={errors.Email} icon={FaRegEnvelope} />
              <InputPassword
                name="Password"
                label="Contraseña"
                icon={FiLock}
                touched={touched.Password}
                error={errors.Password}
              />
              <div className="flex justify-end">
                <Link to="/change-password" className="mt-2 text-sm">
                  ¿Olvidaste la contraseña?
                </Link>
              </div>
              <div className="mt-6 md:mt-4 flex flex-col items-center">
                <Button
                  type="submit"
                  className={`w-full mt-3 ld-over ${isLoading ? "running" : ""}`}
                  disabled={!isValid || isLoading}
                >
                  <span className="ld ld-ring ld-spin text-base" />
                  Iniciar Sesión
                </Button>
                <small className="my-3">o puedes</small>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT}
                  render={(props) => (
                    <Button
                      type="button"
                      className="w-full border flex items-center border-gray-400 bg-white"
                      click={props.onClick}
                      disabled={props.disabled}
                    >
                      <span className="mr-2">
                        <FcGoogle />
                      </span>{" "}
                      Acceder con google
                    </Button>
                  )}
                  onSuccess={onGoogleLogin}
                  onFailure={onGoogleLogin}
                />
              </div>
              <p className="text-sm mt-6 text-center">
                Al usar nuestros servicios, estás aceptando nuestras{" "}
                <a href="https://instakash.net/politicas-de-privacidad">políticas de privacidad</a> y{" "}
                <a href="https://instakash.net/terminos-y-condiciones">términos y condiciones</a>.
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (values) => dispatch(actions.loginUserInit(values)),
    loginGoogle: (token) => dispatch(actions.loginGoogleInit(token)),
  };
};

const ConnectedComponent = connect(null, mapDispatchToProps)(SignIn);

export default React.forwardRef((props, ref) => <ConnectedComponent {...props} forwardRef={ref} />);
