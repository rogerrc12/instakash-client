import React from "react";
import { useSelector, connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Field } from "formik";
import { TiWarning } from "react-icons/ti";
import { formatPrice } from "../../../shared/utils";

import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Calculator/Input";
import Swipe from "../../../components/UI/Calculator/Swipe";
import Limits from "../../../components/UI/Calculator/Limits";
import Price from "../../../components/UI/Calculator/Price";
import Spinner from "../../../components/UI/Spinner";

import classes from "../CurrencyExchange.module.scss";

const Step1 = (props) => {
  const isLoading = useSelector((state) => state.currencyExchange.isLoading);
  const user = useSelector((state) => state.auth.user);

  const { selling, buying } = props.prices;

  const checkAmountHandler = () => {
    if ((props.sending > 9999 && props.idCurrencyToSend === 1) || (props.sending > 29999 && props.idCurrencyToSend === 2)) {
      if (!user.birthday) {
        props.setModal("profile");
        props.openModal();
      } else {
        props.next();
      }
    } else {
      props.next();
    }
  };

  const changeCurrencies = (condition, setField) => {
    if (!selling && !buying) return;

    props.changeCondition(condition, setField);
  };

  let prices = (
    <div className={classes.PricesWrapper}>
      <Price label='Compra' price={formatPrice(buying)} />
      <div className={classes.PriceDivider} />
      <Price label='Venta' price={formatPrice(selling)} />
    </div>
  );

  if (isLoading) prices = <Spinner />;

  return (
    <>
      <h2>
        Ahorra <br /> <b>Cambiando Dolares</b>
      </h2>
      {prices}
      <div className='relative'>
        <Input label='Envias' name='sending' {...props} disabled={!selling && !buying} />
        <Field
          name='condition'
          component={({ form }) => <Swipe condition={props.condition} disabled={!selling && !buying} change={() => changeCurrencies(props.condition, form.setFieldValue)} />}
        />
        <Input label='Recibes' name='receiving' {...props} disabled={!selling && !buying} />
        {props.errors.receiving && (
          <p className={classes.Warning}>
            <TiWarning /> {props.errors.receiving}
          </p>
        )}
        {/* <p className='alert-msg mt-4'>* Solo se aceptan transferencias bancarias.</p> */}
        <Limits>
          <p>
            ¿Monto mayor a <strong>5.000 $</strong> o <strong>S/. 15.000</strong>?
          </p>
        </Limits>
        <Button type='button' click={checkAmountHandler} disabled={props.sending < 30 || !!props.errors.receiving || (!selling && !buying)} className={classes.FirstButton}>
          Continuar
        </Button>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(actions.openModal()),
  };
};

export default connect(null, mapDispatchToProps)(Step1);
