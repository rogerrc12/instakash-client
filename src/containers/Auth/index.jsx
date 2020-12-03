import React, { useState, useRef } from "react";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { CSSTransition } from "react-transition-group";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SplashScreen from "./SplashScreen";

import classes from "./Auth.module.scss";
import "../../assets/css/animations.css";

const Auth = (props) => {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const setAuthComponent = (component) => dispatch(actions.setAuthComponent(component));

  const showSignUp = () => {
    setAuthComponent("register");
    setShow(true);
  };

  const showSignIn = () => {
    setAuthComponent("login");
    setShow(true);
  };

  const { isAuth, authComponent } = useSelector((state) => state.auth);
  let from;

  if (!props.location.state || props.location.state.from.pathname === "/") {
    from = { pathname: "/" };
  } else {
    from = props.location.state.from;
  }

  if (isAuth) {
    return <Redirect to={from} />;
  }

  return (
    <article className={classes.Auth}>
      <SplashScreen showSignIn={showSignIn} showSignUp={showSignUp} />

      {isMobile ? (
        <CSSTransition in={show} nodeRef={nodeRef} timeout={800} unmountOnExit mountOnEnter classNames="slide-up-down">
          <AuthForm
            ref={nodeRef}
            login={props.login}
            type={authComponent}
            showSignIn={showSignIn}
            showSignUp={showSignUp}
            history={props.history}
          />
        </CSSTransition>
      ) : (
        <AuthForm
          login={props.login}
          ref={nodeRef}
          type={authComponent}
          showSignIn={showSignIn}
          showSignUp={showSignUp}
          history={props.history}
        />
      )}
    </article>
  );
};

const AuthForm = React.forwardRef((props, ref) => {
  return props.type === "register" ? <SignUp {...props} ref={ref} /> : <SignIn {...props} ref={ref} />;
});

export default Auth;
