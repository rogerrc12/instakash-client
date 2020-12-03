import React from "react";
import { Field } from "formik";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import ErrorMessage from "../../AuthForm/Error";
import "moment/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";
import moment from "moment";

// const dateFormat = "DD/MM/YYYY";

const DatepickerInput = (props) => {
  return (
    <div className="my-4 md:my-0 md:mb-4 w-full mr-3">
      <Field name={props.name}>
        {({ field, form }) => (
          <DatePicker
            placeholder={props.placeholder}
            style={{ width: "100%", height: "50px", borderRadius: "5px" }}
            defaultPickerValue={moment()}
            onChange={(date, dateString) => form.setFieldValue(field.name, dateString)}
            locale={locale}
          />
        )}
      </Field>
      <ErrorMessage name={props.name} />
    </div>
  );
};

DatepickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default DatepickerInput;
