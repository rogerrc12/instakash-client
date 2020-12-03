import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.scss";

const NavItem = (props) => {
  const Icon = props.icon;

  return (
    <li className={classes.NavItem}>
      <NavLink to={props.to} activeClassName={props.active}>
        <span className="mr-3">
          <Icon />
        </span>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
