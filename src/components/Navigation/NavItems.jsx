import React from "react";
import { BsHouseDoor } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { GiBank } from "react-icons/gi";

import NavItem from "./NavItem";

import classes from "./Navigation.module.scss";

const NavItems = () => {
  return (
    <ul className='mt-8 w-full'>
      <NavItem to='/actividad' icon={BsHouseDoor} active={classes.Active}>
        Actividad
      </NavItem>
      <NavItem to='/cambio-de-divisas' icon={FiDollarSign} active={classes.Active}>
        Cambio de divisas
      </NavItem>
      <NavItem to='/avance-de-efectivo' icon={BsCreditCard} active={classes.Active}>
        Avance de efectivo
      </NavItem>
      <NavItem to='/mis-cuentas' icon={GiBank} active={classes.Active}>
        Mis cuentas
      </NavItem>
    </ul>
  );
};

export default NavItems;
