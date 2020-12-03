import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import * as actions from "../../../store/actions";

import SplashScreen from "../SplashScreen";
import Logo from "../../../components/UI/Logo";
import AskEmail from "./AskEmail";
import PasswordForm from "./PasswordForm";

import classes from "../Auth.module.scss";

const ChangePassword = (props) => {
  const { validatePasswordChange } = props;
  const { search } = props.location;
  const params = new URLSearchParams(search);
  const tokenId = params.get("tokenId");
  const userId = params.get("userId");

  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    if (tokenId) {
      validatePasswordChange(tokenId);
    }
  }, [tokenId, validatePasswordChange]);

  const changeComponent = tokenId ? (
    <PasswordForm changePassword={props.changePassword} isLoading={isLoading} userId={userId} />
  ) : (
    <AskEmail sendPasswordEmail={props.sendPasswordEmail} isLoading={isLoading} />
  );

  return (
    <article className={classes.Auth}>
      <SplashScreen showSignIn={() => {}} showSignUp={() => {}} />

      <section className={classes.AuthWrapper + " p-8 md:p-0 md:py-6"}>
        <Logo color className="mb-6" />
        <h2 className="mb-4 md:mb-2">Cambia tu contraseña</h2>

        {changeComponent}
      </section>
    </article>
  );
};

const mapDispatchToProps = (dispatch) => ({
  sendPasswordEmail: (email) => dispatch(actions.sendPasswordEmailInit(email)),
  validatePasswordChange: (token) => dispatch(actions.validatePasswordChangeInit(token)),
  changePassword: (password, userId) => dispatch(actions.changePasswordInit(password, userId)),
});

export default connect(null, mapDispatchToProps)(ChangePassword);
