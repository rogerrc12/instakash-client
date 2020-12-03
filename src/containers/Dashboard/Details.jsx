import React, { useEffect } from "react";

import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Tag } from "antd";

import ProfilePhoto from "../../components/UI/ProfilePhoto";
import TransferForm from "./Transferform";
import CopyButton from "../../components/UI/CopyButton";

import classes from "./Dashboard.module.scss";

const ActivityDetails = (props) => {
  const { getExchangeDetails, id, exchangeDetails, getAdvanceDetails, advanceDetails, type } = props;

  useEffect(() => {
    if (type === "exchange") {
      getExchangeDetails(id);
    } else {
      getAdvanceDetails(id);
    }
  }, [getExchangeDetails, getAdvanceDetails, type, id]);

  let color;

  let exchangeDetailsComponent = <p>Cargando...</p>;
  let advanceDetailsComponent = <p>Cargando...</p>;

  if (exchangeDetails) {
    exchangeDetailsComponent = (
      <>
        <div className='flex justify-between items-end mb-10'>
          <div className='flex items-center'>
            <ProfilePhoto photo={props.user.photoURL} className='block' />
            <div>
              <h3 className='font-bold text-base'>{props.user.name}</h3>
              <p>{exchangeDetails.date}</p>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-sm'>Solicitado</p>
            <p className='my-2 font-bold'>{exchangeDetails.amount}</p>
            <Tag color={exchangeDetails.statusColor} style={{ margin: 0, fontSize: ".65rem", fontWeight: "bold" }}>
              {exchangeDetails.status.toUpperCase()}
            </Tag>
          </div>
        </div>
        <div className='flex items-center justify-between my-4'>
          <h4>Número de pedido:</h4>
          <p className='text-right'>{exchangeDetails.orderId}</p>
        </div>
        <div className='flex items-center justify-between my-4'>
          <h4>Fecha de solicitud:</h4>
          <p className='text-right'>{exchangeDetails.date}</p>
        </div>
        <div className='flex items-center justify-between my-4'>
          <h4>Monto a enviar:</h4>
          <p style={{ color }} className='text-right'>
            {exchangeDetails.amountToSend}
          </p>
        </div>

        {exchangeDetails.statusId === 2 ? (
          <div className='flex items-center justify-between my-4'>
            <h4>Cuenta a transferir:</h4>
            <div className='text-right'>
              <div className='d-flex items-center'>
                {exchangeDetails.instaBankName}{" "}
                <img
                  style={{ marginLeft: 5, maxWidth: 12, display: "inline-block" }}
                  src={"data:image/png;base64, " + exchangeDetails.instaBankImage}
                  alt={exchangeDetails.instaBankName}
                />
              </div>
              {exchangeDetails.instaAccount}
              <CopyButton textToCopy={exchangeDetails.instaAccount} tooltip='cuenta copiada!'>
                Copiar
              </CopyButton>
            </div>
          </div>
        ) : null}

        <div className='flex items-center justify-between my-4'>
          <h4>Monto solicitado:</h4>
          <p style={{ color }} className='text-right'>
            {exchangeDetails.amount}
          </p>
        </div>
        <div className='flex items-center justify-between my-4'>
          <h4>Cuenta a debitar:</h4>
          <p className='text-right'>
            {exchangeDetails.bankToDeposit} <br /> {`termina en ${exchangeDetails.bankAccount.substring(exchangeDetails.bankAccount.length - 4, exchangeDetails.bankAccount)}`}
          </p>
        </div>
        <div className='flex items-center justify-between my-4'>
          <h4>Tasa de cambio:</h4>
          <p className='text-right'>{exchangeDetails.rate}</p>
        </div>
        <div className='flex justify-center mt-8'>
          <TransferForm type={props.type} statusId={exchangeDetails.statusId} processExchange={props.processExchange} id={id} />
        </div>
      </>
    );
  }

  if (advanceDetails) {
    advanceDetailsComponent = (
      <>
        <div className='flex justify-between items-end mb-10'>
          <div className='flex items-center'>
            <ProfilePhoto photo={props.user.photoURL} className='block' />
            <div className=' w-7/12'>
              <h3 className='font-bold text-base'>{props.user.name}</h3>
              <p>{advanceDetails.date}</p>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-sm'>Compra por: </p>
            <p className='my-2 font-bold'>{advanceDetails.amountToPay}</p>
            <Tag color={advanceDetails.statusColor} style={{ margin: 0, fontSize: ".65rem", fontWeight: "bold" }}>
              {advanceDetails.status.toUpperCase()}
            </Tag>
          </div>
        </div>
        <div className='flex items-center justify-between my-4'>
          <h4>Número de pedido:</h4>
          <p className='text-right'>{advanceDetails.orderId}</p>
        </div>
        <div className='flex items-center justify-between my-4'>
          <h4>Monto a pagar:</h4>
          <p className='text-right'>{advanceDetails.amountToPay}</p>
        </div>
        <div className='flex items-center justify-between my-4'>
          <h4>Reembolso:</h4>
          <p className='text-right'>{advanceDetails.amountToReceive}</p>
        </div>
        <div className='flex items-center justify-between my-4'>
          <h4>Cuenta a recibir:</h4>
          <p className='text-right'>
            {advanceDetails.bankToDeposit + " - Termina en " + advanceDetails.bankAccount.substring(advanceDetails.bankAccount.length - 4, advanceDetails.bankAccount.length)}
          </p>
        </div>
        <div className='flex items-center justify-between my-4'>
          <h4>Forma de pago:</h4>
          <p className='text-right'>Tarjeta de crédito {advanceDetails.paymentOption.name}</p>
        </div>
        {advanceDetails.statusId === 2 && advanceDetails.paymentLink ? (
          <div className='flex items-center flex-wrap justify-between my-4'>
            <h4>Link de pago:</h4>
            <a className='text-right' href={advanceDetails.paymentLink} target='_blank' rel='noopener noreferrer'>
              {advanceDetails.paymentLink}
            </a>
          </div>
        ) : null}
        <div className='flex justify-center mt-8'>
          <TransferForm type={props.type} statusId={advanceDetails.statusId} id={id} processAdvance={props.processAdvance} />
        </div>
      </>
    );
  }

  return (
    <section>
      <h2>Detalles de operación</h2>
      <div className={classes.ActivityDetails}>{props.type === "exchange" ? exchangeDetailsComponent : advanceDetailsComponent}</div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    exchangeDetails: state.activity.exchangeDetails,
    advanceDetails: state.activity.advanceDetails,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExchangeDetails: (id) => dispatch(actions.getExchangeDetailsInit(id)),
    getAdvanceDetails: (id) => dispatch(actions.getAdvanceDetailsInit(id)),
    processExchange: (id, transferNumber) => dispatch(actions.processExchangeInit(id, transferNumber)),
    processAdvance: (number, id) => dispatch(actions.processAdvanceInit(number, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetails);
