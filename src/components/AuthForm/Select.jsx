import React from "react";
import Select from "../UI/Form/Select/Select";
import ErrorMessage from "./Error";

const AuthSelect = (props) => {
  const Icon = props.icon;

  return (
    <div className="relative">
      <span
        className="absolute top-0 left-0 flex items-center pl-3"
        style={{ marginTop: ".85rem" }}
      >
        <Icon />
      </span>
      <div className="my-3">
        <Select {...props} />
        <ErrorMessage name={props.name} />
      </div>
    </div>
  );
};

export default AuthSelect;
