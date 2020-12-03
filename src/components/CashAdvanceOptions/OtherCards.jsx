import React from "react";
import CreditCard from "../../assets/images/banks/credit-card.png";

import OptionsWrapper from "../UI/OptionsWrapper";

const OtherCards = (props) => {
  return (
    <OptionsWrapper title='Pago con otra tarjeta' image={CreditCard} imageStyle={{ maxWidth: "4.5rem" }}>
      <ul>
        <li>
          <b>1.</b> Ingrese en el link de pago a continuación: <br />
          <a href={props.paymentLink} target='_blank' rel='noopener noreferrer'>
            REALIZAR EL PAGO
          </a>
        </li>
        <li>
          <b>2.</b> Verifique el <strong>monto y nuestro identificador (61040894).</strong>
        </li>
        <li>
          <b>3.</b> Pague con su tarjeta y guarde su referencia de pago.
        </li>
      </ul>
    </OptionsWrapper>
  );
};

export default OtherCards;
