import React from "react";
import InterbankLogo from "../../assets/images/banks/interbank-logo.png";

import OptionsWrapper from "../UI/OptionsWrapper";

const InterbankCardd = () => {
  return (
    <OptionsWrapper title='Pago con TDC Interbank' image={InterbankLogo}>
      <ul>
        <li>
          Acceda a <strong>banca por internet</strong> de Interbank aqui:{" "}
          <a href='https://bancaporinternet.interbank.pe/login#/login' target='_blank' rel='noopener noreferrer'>
            Ingresar
          </a>
        </li>
        <li>
          <b>1.</b> Ingresa a la ventana de <strong>operaciones</strong> y seleccione <strong>pagos y recargas.</strong>
        </li>
        <li>
          <b>2.</b> Seleccione la opción <strong>Pagar a institución o empresa.</strong>
        </li>
        <li>
          <b>3.</b> Busquenos con el nombre de <strong>Instakash SAC.</strong>
        </li>
        <li>
          <b>4.</b> Ingrese la referencia de pago <strong>en el casillero debajo</strong>
        </li>
      </ul>
    </OptionsWrapper>
  );
};

export default InterbankCardd;
