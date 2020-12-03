import React from "react";
import Select, { components } from "react-select";

const { Option, ValueContainer, Placeholder } = components;

const styles = {
  singleValue: (provided, state) => ({
    ...provided,
    transform: "translateY(-35%)",
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: ".8rem",
  }),
  placeholder: (provided, state) => {
    const isValid = state.isFocused || state.hasValue || state.selectProps.inputValue;
    return {
      ...provided,
      transform: isValid ? "translate(-1px, -150%)" : "translateY(-45%)",
      color: isValid ? "#02c39a" : "#999999",
      fontSize: isValid ? ".6rem" : ".8rem",
      transition: "all 300ms ease-out",
    };
  },
  control: (provided, state) => ({
    ...provided,
    height: "100%",
  }),
};

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );
};

const IconOption = (props) => (
  <Option {...props}>
    <img
      src={props.data.icon ? props.data.icon : "data:image/png;base64," + props.data.image}
      alt={props.data.label}
      style={{ width: "25px", marginRIght: "10px", display: "inline-block" }}
    />
    <span className="ml-2">{props.data.label}</span>
  </Option>
);

const IconSelect = (props) => {
  return (
    <Select
      onChange={props.onChange}
      value={props.value}
      styles={styles}
      placeholder={props.placeholder}
      options={props.options}
      className={props.className}
      components={{ Option: IconOption, ValueContainer: CustomValueContainer }}
    />
  );
};

export default IconSelect;
