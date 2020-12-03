import React from "react";
import bbvaLogo from "../../assets/images/banks/bbva.svg";

import OptionsWrapper from "../UI/OptionsWrapper";
import CopyButton from "../UI/CopyButton";

const ScotiaCard = () => {
  return (
    <OptionsWrapper title='Pago con TDC BBVA' image={bbvaLogo}>
      <ul>
        <li>
          Acceda a <strong>banca por internet</strong> de BBVA aqui:{" "}
          <a href='https://www.bbva.pe/' target='_blank' rel='noopener noreferrer'>
            Ingresar
          </a>
        </li>
        <li>
          <b>1.</b> Ingrese en la pestaña de su <strong>Tarjeta de Crédito.</strong>
        </li>
        <li>
          <b>2.</b> Seleccione la opción <strong>Pagar servicio</strong> y luego en <strong>Nuevo servicio.</strong>
        </li>
        <li>
          <b>3.</b> Busquenos con el nombre de <strong>Globokas</strong> e ingrese el código de terminal <strong>14956103.</strong>
          <CopyButton tooltip='código copiado!' textToCopy='14956103'>
            Copiar código
          </CopyButton>
        </li>
        <li>
          <b>4.</b> En el importe mostrado, marque la opción <strong>Otro importe</strong> e ingrese el monto de su avance.
        </li>
      </ul>
    </OptionsWrapper>
  );
};

export default ScotiaCard;
