import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import Cleave from "cleave.js/react";

import classes from "./Calculator.module.scss";

const Input = (props) => {
  let selectValue;

  if (props.condition === "buying" && props.name === "sending") {
    selectValue = "USD";
  } else if (props.condition === "buying" && props.name === "receiving") {
    selectValue = "PEN";
  } else if (props.condition === "selling" && props.name === "sending") {
    selectValue = "PEN";
  } else if (props.condition === "selling" && props.name === "receiving") {
    selectValue = "USD";
  }

  return (
    <div className={classes.InputWrapper}>
      <div className={classes.FloatLabel}>
        <label>{props.label}</label>
        <Field name={props.name} type="text">
          {({ field, form }) => (
            <Cleave
              value={field.value}
              options={{
                numeral: true,
                numeralDecimalMark: ".",
                delimiter: "",
                numericOnly: true,
              }}
              onChange={(e) => {
                props.changeAmount(e, field.name, form.setFieldValue);
                form.setFieldValue(field.name, +e.target.rawValue);
              }}
              disabled={props.prices.loading || props.disabled}
            />
          )}
        </Field>
      </div>
      <Field name="condition">
        {({ form }) => (
          <select
            value={selectValue}
            disabled={props.disabled}
            onChange={() => props.changeCondition(props.condition, form.setFieldValue)}
          >
            <option value="PEN">Soles</option>
            <option value="USD">Dolares</option>
          </select>
        )}
      </Field>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default React.memo(Input);
