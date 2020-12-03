import React from "react";
import { isChrome } from "react-device-detect";

import Logo from "../../components/UI/Logo";
import Button from "../../components/UI/Button";
import BgChrome from "../../assets/images/bg/earth-bg.webp";
import Bg from "../../assets/images/bg/earth-bg.jpg";

import classes from "./Auth.module.scss";

const SplashScreen = (props) => {
  let background;

  if (isChrome) {
    background = BgChrome;
  } else {
    background = Bg;
  }

  return (
    <section className={classes.SplashScreen} style={{ backgroundImage: `url(${background})` }}>
      <div className={classes.SplashContent + " container mx-auto md:none p-12 relative"}>
        <Logo />
        <h1 className="my-6">
          Ahorra <br /> <span>Cambiando</span> <br /> Dólares
        </h1>
        <div className={classes.ActionWrapper}>
          <Button type="button" click={props.showSignIn}>
            Iniciar Sesión
          </Button>
          <Button type="button" click={props.showSignUp}>
            Registrarse
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SplashScreen;
