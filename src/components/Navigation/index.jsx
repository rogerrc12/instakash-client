import React from "react";
import { Link } from "react-router-dom";

import Logo from "../UI/Logo";
import Card from "../UI/Card/Publicity";
import Backdrop from "../UI/Backdrop";
import NavItems from "./NavItems";
import Tips from "../../assets/images/tips.svg";

import classes from "./Navigation.module.scss";

const Navigation = (props) => {
  const classNavList = [classes.Navigation];

  if (props.opened) {
    classNavList.push(classes.Opened);
  }

  return (
    <>
      <Backdrop show={props.opened} close={props.closeHandler} />
      <nav className={classNavList.join(" ") + " px-3 pt-8 pb-6 md:pb-12"} onClick={props.closeHandler}>
        <Link to="/">
          <Logo color className={classes.Logo} />
        </Link>
        <NavItems />
        <Card image={Tips}>
          <h4>Tips de importancia</h4>
          <p className="uppercase">
            <strong>¡Realiza tu Avance de Efectivo!</strong>
          </p>
          <ul>
            <li className="mb-3">
              Solo registra, selecciona tu cuenta para recibir el dinero y realiza el pago con tu tarjeta de crédito.
            </li>
            <li>
              <strong>¡ Listo !</strong>, En pocos minutos tendrás tu dinero en tu cuenta.
            </li>
          </ul>
        </Card>
      </nav>
    </>
  );
};

export default Navigation;
