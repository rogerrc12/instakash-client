import React from "react";
import { Field } from "formik";
import ErrorMessage from "./Error";

const Input = ({ icon, className, label, touched, error, name, ...rest }) => {
  const Icon = icon;

  return (
    <div className="relative">
      <span className="absolute top-0 left-0 flex items-center pl-3" style={{ marginTop: ".85rem" }}>
        <Icon />
      </span>
      <div className="my-3">
        <Field
          name={name}
          {...rest}
          className={`${className} rounded-lg border appearance-none block w-full p-3 pl-10 leading-tight ${
            touched && error ? "border-red-500" : ""
          }`}
          placeholder={label}
        />
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default Input;
