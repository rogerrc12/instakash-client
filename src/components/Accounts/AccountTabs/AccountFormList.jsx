import React from "react";
import * as actions from "../../../store/actions";
import { Field } from "formik";
import { connect } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";

import Button from "../../UI/Button";
import CustomButton from "../../UI/CustomButton";

import classes from "./AccountTabs.module.scss";

const AccountFormList = (props) => {
  const accounts = props.accounts.filter((acc) => acc.idCurrency === props.currencyToReceive);

  const addAccountHandler = () => {
    if (props.setModal) props.setModal("account");
    props.setIsThird(props.third);
    props.setCurrency(props.currencyToReceive);
    props.openModal();
  };

  return (
    <div className={`${classes.AccountList} disable-scrollbars`}>
      {accounts.length > 0 ? (
        <>
          {accounts.map((account) => (
            <Field
              key={account.id}
              name='bankToReceive'
              component={({ form, field }) => (
                <CustomButton
                  onClick={() => {
                    form.setFieldValue(field.name, account.id);
                    form.setFieldValue("accountToReceive", account.number);
                    form.setFieldValue("idBank", account.idBank);
                    form.setFieldValue("bankNameToReceive", account.bank);
                  }}
                  active={field.value === account.id}
                >
                  <img src={"data:image/png;base64," + account.image} alt={account.bank} />
                  <div className={classes.AccountInfo}>
                    <h4>{account.alias}</h4>
                    <p>Termina en {account.number.substring(account.number.length - 4, account.number.length)}</p>
                  </div>
                  <span>{account.currency}</span>
                </CustomButton>
              )}
            />
          ))}
          {accounts.length < 3 ? (
            <Button click={addAccountHandler} type='button'>
              <span className='mr-3'>
                <AiOutlinePlusCircle />
              </span>
              Agregar cuenta
            </Button>
          ) : null}
        </>
      ) : (
        <>
          <p className='font-bold'>Agrega una cuenta para continuar</p>
          <Button click={addAccountHandler} type='button'>
            <span className='mr-3'>
              <AiOutlinePlusCircle />
            </span>
            Agregar cuenta
          </Button>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setIsThird: (value) => dispatch(actions.setIsThird(value)),
  setCurrency: (value) => dispatch(actions.setCurrency(value)),
  openModal: () => dispatch(actions.openModal()),
});

export default connect(null, mapDispatchToProps)(AccountFormList);
