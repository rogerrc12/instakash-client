import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import * as actions from "../../../store/actions";
import { AiOutlineInfoCircle } from "react-icons/ai";

import Button from "../../../components/UI/Button";
import OtherCardOption from "../../../components/CashAdvanceOptions/OtherCards";
// import InterbankCardOption from "../../../components/CashAdvanceOptions/InterbankCard";
import BbvaCardOption from "../../../components/CashAdvanceOptions/BbvaCard";
import ScotiaCardOption from "../../../components/CashAdvanceOptions/ScotiaCard";

import classes from "../CashAdvance.module.scss";

const Success = (props) => {
  const { values } = props;

  const [paymentNumber, setPaymentNumber] = useState(null);
  const [error, setError] = useState(false);
  const { newAdvanceId, isLoading, paymentLink } = useSelector((state) => state.cashAdvance);

  const { paymentBanks, currencies } = useSelector((state) => state.registration);

  const selectedBank = paymentBanks.find((bank) => bank.idBank === values.IdPayingBank);
  const currency = currencies.find((currency) => currency.idCurrencyType === props.values.idCurrencyToReceive);

  const onChange = (e) => setPaymentNumber(e.target.value);

  const sendPaymentNumber = () => {
    const onlyNumbers = /^\d+$/;
    if (!onlyNumbers.test(paymentNumber)) return setError(true);

    setError(false);
    props.processAdvance(paymentNumber, newAdvanceId, props.goStep, props.connection);
  };

  const cancelAdvanceHandler = () => props.cancelAdvance(newAdvanceId, props.goStep);

  return (
    <>
      <h2>¡Último paso!</h2>
      <p className='mb-3'>
        <strong>Debe completar su solicitud de avance a continuación.</strong>
      </p>

      <div className={classes.Details}>
        <div className='flex items-center justify-between'>
          <p>Monto a pagar:</p>
          <p className='font-bold'>{currency.symbol + " " + props.values.amountToPay.toFixed(2)}</p>
        </div>
      </div>

      {selectedBank.idBank === 24 ? <BbvaCardOption /> : selectedBank.idBank === 21 ? <ScotiaCardOption /> : <OtherCardOption paymentLink={paymentLink} />}

      <div className={classes.TransferInfo}>
        <p className='m-l2'>
          Envíenos su <strong>referencia de pago</strong> o <strong>nro. de operación</strong> en el casillero que se encuentra debajo. En un <strong>máximo de 30 minutos</strong>{" "}
          recibirá su avance.
        </p>
        <AiOutlineInfoCircle />
      </div>
      <div className={classes.TransferWrapper}>
        <input type='text' name='transferNumber' placeholder='Nro. de referencia' onChange={onChange} />
        <Button type='button' click={sendPaymentNumber} disabled={!paymentNumber} className={`ld-over ${isLoading ? "running" : ""}`}>
          <span className='ld ld-ring ld-spin text-base' />
          Enviar
        </Button>
      </div>
      {error ? <span className='error-msg'>Debes colocar una referencia de pago válida.</span> : null}
      <p className='text-sm'>
        <strong>IMPORTANTE: </strong> Solo dispone de <strong>15 minutos</strong> para colocar su nro. de referencia.
      </p>
      <div className={classes.ActionWrapper}>
        <Button type='button' click={cancelAdvanceHandler}>
          Cancelar
        </Button>
        <Link to='/actividad' className={classes.Unique}>
          Ir al inicio
        </Link>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  processAdvance: (number, id, goStep, connection) => dispatch(actions.processAdvanceInit(number, id, goStep, connection)),
  cancelAdvance: (id, goStep) => dispatch(actions.cancelAdvanceInit(id, goStep)),
});

export default connect(null, mapDispatchToProps)(Success);
