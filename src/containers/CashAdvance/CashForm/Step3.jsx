import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import Button from "../../../components/UI/Button";
import CustomButton from "../../../components/UI/CustomButton";
import ErrorMessage from "../../../components/AuthForm/Error";

import classes from "../CashAdvance.module.scss";

const Step3 = (props) => {
  const { values } = props;

  const selectPaymentType = (value) => props.setFieldValue("IdPayingBank", value);
  const banks = useSelector((state) => state.registration.paymentBanks);
  const otherBank = banks.find((bank) => bank.idBank === 21);
  const arrangedBanks = banks.filter((bank) => bank.idBank !== 21);
  arrangedBanks.push(otherBank);

  const calculateToReceive = () => {
    if (values.IdPayingBank) {
      const comission = values.IdPayingBank !== 22 ? values.amountToPay * 0.03 : values.amountToPay * 0.06;
      const totalToReceive = values.amountToPay - comission;

      props.setFieldValue("amountToReceive", totalToReceive);
      props.goNext();
    } else return;
  };

  return (
    <>
      <h2>
        ¿Con que tipo de <strong>tarjeta</strong> desea realizar su avance?
      </h2>
      {arrangedBanks.map((bank) => (
        <Fragment key={bank.idBank}>
          <CustomButton
            active={values.IdPayingBank === bank.idBank}
            className={classes.PaymentType}
            onClick={selectPaymentType.bind(this, bank.idBank)}
          >
            <div className={classes.PaymentTypeInfo}>
              <h4>Tarjeta de crédito {bank.name}</h4>
            </div>
            <img src={`data:image/png;base64,${bank.image}`} alt={bank.name} style={bank.idBank === 24 ? { maxWidth: "50px" } : {}} />
          </CustomButton>
          <small style={{ marginLeft: "10px", fontSize: "13px", marginBottom: "5px" }}>
            Comisión del <strong>{bank.idBank === 21 || bank.idBank === 24 ? "3" : "6"}%</strong> en esta forma de pago.
          </small>
        </Fragment>
      ))}

      <ErrorMessage name='paymentType' />
      <div className={classes.ActionWrapper}>
        <Button click={props.goBack} className={classes.PrevButton} type='button'>
          Volver
        </Button>
        <Button click={calculateToReceive} type='button' disabled={!values.IdPayingBank}>
          Continuar
        </Button>
      </div>
    </>
  );
};

export default Step3;
