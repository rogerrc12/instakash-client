import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import IconSelect from "../Select/IconSelect";
import Select from "../Select/Select";

import ErrorMessage from "../../../AuthForm/Error";

import classes from "./FloatedLabel.module.scss";

const FloatedInputLabel = (props) => {
  const InputClasses = [classes.FloatedLabel];

  if ((props.value && props.value.length > 0) || (props.type === "select" && !props.withIcon)) {
    InputClasses.push(classes.TouchedLabel);
  }

  let Input = (
    <Field
      name={props.name}
      id={props.id}
      type={props.type}
      className={`${props.touched && props.error ? classes.Error : ""} ${props.className}`}
    />
  );

  if (props.type === "select") {
    if (props.withIcon) {
      Input = (
        <Field
          name={props.name}
          component={({ field, form }) => (
            <IconSelect
              {...props}
              className={classes.IconSelect}
              value={props.options.find((option) => option.value === field.value)}
              onChange={(option) => form.setFieldValue(field.name, option.value)}
            />
          )}
        />
      );
    } else {
      Input = <Select {...props}>{props.children}</Select>;
    }
  }

  return (
    <div className={`my-4 md:my-0 md:mb-4 ${props.className || ""}`} style={props.style}>
      <div className={InputClasses.join(" ")}>
        {Input}
        <label htmlFor={props.id}>
          <span>{props.label}</span>
        </label>
      </div>
      <ErrorMessage name={props.name} />
    </div>
  );
};

FloatedInputLabel.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default React.memo(FloatedInputLabel);
