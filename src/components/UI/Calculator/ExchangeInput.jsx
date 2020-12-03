import React from "react";
import { Field } from "formik";
import Cleave from "cleave.js/react";

import classes from "./Calculator.module.scss";

const ExchangeInput = (props) => {
  return (
    <div className={classes.InputWrapper}>
      <div className={classes.FloatLabel}>
        <label>{props.label}</label>
        <Field name={props.name}>
          {({ field, form }) => (
            <Cleave
              value={field.value}
              options={{
                numeral: true,
                numeralDecimalMark: ".",
                delimiter: "",
                numericOnly: true,
              }}
              onChange={(e) => form.setFieldValue(field.name, +e.target.rawValue)}
            />
          )}
        </Field>
      </div>
      <select value="PEN" disabled>
        <option value="PEN">Soles</option>
      </select>
    </div>
  );
};

export default ExchangeInput;
