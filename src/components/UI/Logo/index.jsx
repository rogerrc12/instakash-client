import React from "react";
import WhiteLogo from "../../../assets/images/logo-white.svg";
import ColorLogo from "../../../assets/images/logo-color.svg";

const Logo = (props) => {
  return (
    <img
      src={props.color ? ColorLogo : WhiteLogo}
      alt="Instakash"
      className={"w-48 " + props.className}
    />
  );
};

export default Logo;
