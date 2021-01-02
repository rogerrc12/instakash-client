import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return <Route {...rest} component={(props) => (isAuth ? <Component {...rest} {...props} /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />)} />;
};

export default PrivateRoute;
