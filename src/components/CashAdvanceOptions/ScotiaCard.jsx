import React from "react";

import ScotiaLogo from "../../assets/images/banks/scotia-logo.png";
import OptionsWrapper from "../UI/OptionsWrapper";
import CopyButton from "../UI/CopyButton";

const ScotiaCard = () => {
  return (
    <OptionsWrapper title='Pago con TDC Scotiabank' image={ScotiaLogo}>
      <ul>
        <li>
          Acceda a <strong>banca por internet</strong> de Scotiabank aqui:{" "}
          <a href='https://mi.scotiabank.com.pe/login' target='_blank' rel='noopener noreferrer'>
            Ingresar
          </a>
        </li>
        <li>
          <b>1.</b> Seleccione la pestaña <strong>Quiero</strong> y luego <strong>Pagar o recargar.</strong>
        </li>
        <li>
          <b>2.</b> Seleccione <strong>Otras empresas e instituciones</strong> y luego la categoría <strong>Otros.</strong>
        </li>
        <li>
          <b>3.</b> Busquenos con el nombre de <strong>Kasnet</strong> e ingrese el código de terminal <strong>14956103.</strong>
          <CopyButton tooltip='código copiado!' textToCopy='14956103'>
            Copiar código
          </CopyButton>
        </li>
        <li>
          <b>4.</b> En el recibo mostrado, marque la opción <strong>Pagar monto parcial</strong> e ingrese el monto de su avance.
        </li>
        <li>
          <b>IMPORTANTE:</b> Seleccione su <strong>tarjeta de crédito</strong> deseada como cuenta de origen al momento de hacer el pago.
        </li>
      </ul>
    </OptionsWrapper>
  );
};

export default ScotiaCard;
