import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "antd";
import * as actions from "../../../store/actions";
import { useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "../../../components/UI/Button";
import CopyButton from "../../../components/UI/CopyButton";

import classes from "../CurrencyExchange.module.scss";

const Success = (props) => {
  const [transferNumber, setTransferNumber] = useState(null);
  const [error, setError] = useState(false);
  const onChangeTransfer = (e) => setTransferNumber(e.target.value);

  const { newExchange, isLoading } = useSelector((state) => state.currencyExchange);

  const sendTransferNumber = () => {
    const onlyNumbers = /^\d+$/;
    if (transferNumber.length < 5 || transferNumber.length > 10 || !onlyNumbers.test(transferNumber)) return setError(true);

    setError(false);
    props.processExchange(newExchange.idPayment, transferNumber, props.goStep);
  };

  const cancelExchangeHandler = () => props.cancelExchange(newExchange.idPayment);

  return (
    <>
      <h2>¡Último paso!</h2>
      <p className='mb-3'>
        <strong>Instakash NO debita dinero de su cuenta bancaria.</strong>
      </p>
      <p>
        Transfiera el monto a nuestra cuenta <strong>desde su banco:</strong>
      </p>
      <div className={classes.Details}>
        <div className='flex items-center justify-between'>
          <p>Monto a transferir:</p>
          <p>
            <strong>
              {newExchange.currencyFrom.symbol} {newExchange.amountSell.toFixed(2)}
            </strong>
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Banco a transferir:</p>
          <p className='flex items-center'>
            <img src={"data:image/png;base64," + newExchange.instaAccount.bank.image} alt={newExchange.instaAccount.bank.name} />
            <strong className='ml-3'>{newExchange.instaAccount.bank.name}</strong>
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Número de cuenta:</p>
          <p>
            <strong>{newExchange.instaAccount.direct}</strong>
            <br />
            <CopyButton textToCopy={newExchange.instaAccount.direct} tooltip='cuenta copiada!' style={{ display: "block" }}>
              copiar cuenta
            </CopyButton>
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Tipo de cuenta:</p>
          <p>
            <strong>Corriente</strong>
          </p>
        </div>
      </div>
      <div className={classes.TransferInfo}>
        <p className='m-l2'>
          Coloque el <strong>número de su transferencia</strong> dentro del casillero mostrado debajo y darle a <strong>enviar.</strong>{" "}
        </p>
        <Tooltip title='Nro. de operación/transferencia que le muestra su banco al transferirnos.' color='#028090'>
          <AiOutlineInfoCircle />
        </Tooltip>
      </div>
      <div className={`${classes.ActionWrapper} mb-3`}>
        <input type='text' name='transferNumber' placeholder='Número de transferencia' onChange={onChangeTransfer} />
        <Button type='button' disabled={!transferNumber || isLoading} click={sendTransferNumber} className={`ld-over  ${isLoading ? "running" : ""} ${classes.LastButton}`}>
          <span className='ld ld-ring ld-spin text-base' />
          Enviar
        </Button>
      </div>
      {error ? <span className='error-msg'>Debes colocar un número de transferencia válido.</span> : null}
      <p className='text-sm'>
        <strong>IMPORTANTE: </strong> Solo dispone de <strong>15 minutos</strong> para colocar su nro. de transferencia.
      </p>
      <div className={classes.ActionWrapper}>
        <Button type='button' click={cancelExchangeHandler}>
          Cancelar
        </Button>
        <Link to='/actividad' className={classes.LastButton}>
          Ir al inicio
        </Link>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    processExchange: (id, transferNumber, goStep) => dispatch(actions.processExchangeInit(id, transferNumber, goStep)),
    cancelExchange: (id) => dispatch(actions.cancelExchangeInit(id)),
  };
};

export default connect(null, mapDispatchToProps)(Success);
