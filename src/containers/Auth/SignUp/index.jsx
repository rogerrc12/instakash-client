import React, { useState } from "react";

import Logo from "../../../components/UI/Logo";
import Toggle from "./Toggle";
import SignUpUser from "./User";
import SignUpCompany from "./Company";

import classes from "../Auth.module.scss";

const SignUp = React.forwardRef((props, ref) => {
  const [signUpType, setSingUpType] = useState("user");

  const toggleSignUpType = (type) => setSingUpType(type);

  const signUpForm = signUpType === "user" ? <SignUpUser /> : <SignUpCompany />;

  return (
    <section ref={ref} className={classes.AuthWrapper + " p-8 md:p-0 md:py-6 disable-scrollbars"}>
      <Logo color className="my-6" />
      <h2 className="mb-4 md:mb-2">Registrarme</h2>
      <p>Por favor, llena los campos debajo.</p>
      <p>
        ¿Ya eres usuario?
        <button onClick={props.showSignIn} className="ml-2">
          Inicia Sesión
        </button>
      </p>
      <Toggle type={signUpType} toggle={toggleSignUpType} />
      <div className={classes.AuthForm}>{signUpForm}</div>
    </section>
  );
});

export default SignUp;
