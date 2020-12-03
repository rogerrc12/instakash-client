import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const ErrorComponent = (props) => {
  return (
    <ErrorMessage name={props.name}>
      {(message) => (
        <span className="text-red-500 font-bold block mt-1 pl-2" style={{ fontSize: ".82rem" }}>
          {message}
        </span>
      )}
    </ErrorMessage>
  );
};

ErrorComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ErrorComponent;
