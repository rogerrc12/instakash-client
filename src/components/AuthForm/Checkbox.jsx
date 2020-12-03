import React from "react";
import { Field } from "formik";

import classes from "./WrapperButtons.module.scss";

const Checkbox = (props) => {
  return (
    <div className={classes.Checkbox}>
      <label className={"my-4 block " + props.className}>
        <Field type="checkbox" name={props.name} className="mr-2 leading-tight" />
        <small>{props.children}</small>
      </label>
    </div>
  );
};

export default Checkbox;
