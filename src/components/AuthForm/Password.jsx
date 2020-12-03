import React, { useState } from "react";
import { Field } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ErrorMessage from "./Error";

const Password = ({ name, label, className, icon: Icon, touched, error }) => {
  const [type, setType] = useState("password");

  const toggleType = () => setType((prevType) => (prevType === "password" ? "text" : "password"));

  const eyeIcon = type === "password" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />;

  return (
    <div className="relative">
      {Icon ? (
        <span className="z-50 absolute top-0 mt-3 left-0 flex items-center pl-3">
          <Icon />
        </span>
      ) : null}
      <div className="my-3 input-password">
        <div className="relative">
          <Field
            type={type}
            name={name}
            placeholder={label}
            autoComplete="password"
            className={`${className} rounded-lg border appearance-none block w-full p-3 ${
              Icon ? "pl-10" : ""
            } leading-tight ${touched && error ? "border-red-500" : ""}`}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={toggleType}>
            {eyeIcon}
          </span>
        </div>
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default Password;
