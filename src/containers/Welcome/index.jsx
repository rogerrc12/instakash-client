import React from "react";
import { Link } from "react-router-dom";

import CambioDivisas from "../../assets/images/services/cambio-divisas.svg";
import AvanceEfectivo from "../../assets/images/services/avance-efectivo.svg";
import Card from "../../components/UI/Card/Service";

import classes from "./Welcome.module.scss";

const Welcome = () => {
  return (
    <main className={classes.Welcome}>
      <div className={classes.WelcomeWrapper + " rounded-lg"}>
        <h2 className='font-bold md:text-white'>Bienvenido a Instakash</h2>
        <p>Realiza tus servicios de cambio de divisas y avance de efectivo.</p>
        <div className={classes.CardsWrapper}>
          <Link to='/cambio-de-divisas'>
            <Card image={CambioDivisas}>
              <h4>
                Cambio de <br /> Divisas
              </h4>
            </Card>
          </Link>
          <Link to='/avance-de-efectivo'>
            <Card style={{ top: "20px" }} image={AvanceEfectivo}>
              <h4>
                Avance de <br /> Efectivo
              </h4>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
