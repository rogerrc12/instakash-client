import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Field } from "formik";

const Select = (props) => {
  return (
    <div className="relative h-full">
      <Field
        as="select"
        name={props.name}
        className={`${props.className} rounded-lg appearance-none border block w-full p-3 pl-10 leading-tight ${
          props.touched && props.error ? "border-red-500" : ""
        }`}
      >
        {props.children}
      </Field>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <IoIosArrowDown />
      </span>
    </div>
  );
};

export default Select;
