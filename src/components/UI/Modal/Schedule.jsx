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
            Está ingresando fuera de nuestro horario laboral. Usted puede realizar sus operaciones y enviar su dinero con normalidad. Pero serán atendidas en la mañana del
            siguiente día útil.
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
