import React from "react";
import { BsHouseDoor } from "react-icons/bs";
import { TiArrowShuffle } from "react-icons/ti";
import { FiDollarSign } from "react-icons/fi";
import { GiBank } from "react-icons/gi";

import classes from "./FooterNav.module.scss";
import NavItem from "../NavItem";

const FooterNav = () => {
  return (
    <footer className={classes.FooterNav + " p-2"}>
      <ul className='w-full'>
        <NavItem to='/actividad' active={classes.Active} icon={BsHouseDoor}>
          Actividad
        </NavItem>
        <NavItem to='/cambio-de-divisas' active={classes.Active} icon={TiArrowShuffle}>
          Cambiar
        </NavItem>
        <NavItem to='/avance-de-efectivo' active={classes.Active} icon={FiDollarSign}>
          Avance
        </NavItem>
        <NavItem to='/mis-cuentas' icon={GiBank} active={classes.Active}>
          Cuentas
        </NavItem>
      </ul>
    </footer>
  );
};

export default FooterNav;
