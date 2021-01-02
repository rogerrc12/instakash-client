import React from "react";
import { Modal } from "antd";
import clockImg from "../../../assets/images/clock.svg";

import Button from "../Button";

import classes from "./Modal.module.scss";

const Schedule = (props) => {
  return (
    <Modal className={classes.ScheduleModal} centered footer={null} visible={props.visible && !sessionStorage.getItem("modalRead")} destroyOnClose>
      <div className={classes.ModalWrapper}>
        <div className={classes.ModalContent}>
          <img src={clockImg} alt='tiempo' />
          <h4>¡Ingreso fuera de horario!</h4>
          <p>
            Está ingresando fuera de nuestro horario laboral. Usted puede registrar sus operaciones y transferir con normalidad. Pero su cambio se efectuará dentro de nuestro
            horario:
            <br />
            <br />
            <strong>LUNES A VIERNES: 9AM a 7PM</strong>
            <br />
            <strong>SABADOS Y FERIADOS: 9AM a 3PM</strong>
          </p>
          <Button type='button' click={props.close}>
            Lo entiendo, deseo continuar.
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Schedule;
