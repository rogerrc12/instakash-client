import React from "react";
import { connect, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { Formik, Form } from "formik";
import { RiCheckLine } from "react-icons/ri";
import { banksList } from "../../../shared/utils";

import FloatedInput from "../../../components/UI/Form/FloatedLabel";
import Button from "../../../components/UI/Button";

import { validateAccountForm } from "../../../shared/validations.js";
import { accountValues } from "../../../shared/formValues.js";

import classes from "../Accounts.module.scss";

const AccountForm = (props) => {
  const { details: accDetails, addLoading, personalAccounts, thirdAccounts } = useSelector((state) => state.accounts);
  const { documentTypes, currencies } = useSelector((state) => state.registration);
  const banks = useSelector((state) => state.registration.accountBanks);

  const onSubmit = (values) => {
    if (props.formType === "editar") {
      props.editAccount(values, accDetails.id);
    } else {
      props.addAccount(values, props.isThird);
    }
  };

  const isThirdValues = (values, touched, errors) => (
    <>
      <legend>Información del titular</legend>
      <div className='flex items-start flex-wrap md:flex-no-wrap justify-center'>
        <FloatedInput
          type='select'
          label='Tipo de documento'
          name='idDocumentTypeThird'
          id='idDocumentTypeThird'
          className='w-full mr-3'
          value={values.idDocumentTypeThird}
          touched={touched.idDocumentTypeThird}
          error={errors.idDocumentTypeThird}
        >
          <option value=''>Selecciona un documento</option>
          {documentTypes.map((document) => (
            <option key={document.id} value={document.id}>
              {document.docTypeDes}
            </option>
          ))}
        </FloatedInput>
        <FloatedInput
          name='dniNumberThird'
          id='dniNumberThird'
          type='text'
          label='Número de documento'
          className='w-full mr-3'
          value={values.dniNumberThird}
          touched={touched.dniNumberThird}
          error={errors.dniNumberThird}
        />
      </div>
      <div className='flex items-start flex-start md:w-1/2 w-full'>
        <FloatedInput
          name='nameThird'
          id='nameThird'
          type='text'
          label='Nombre y apellido del titular'
          className='w-full'
          value={values.nameThird}
          touched={touched.nameThird}
          error={errors.nameThird}
        />
      </div>
    </>
  );

  const personalSolesAccounts = personalAccounts.filter((a) => {
    return a.idCurrency === currencies.find((c) => c.isOcode === "PEN").idCurrencyType;
  });
  const personalDolaresAccounts = personalAccounts.filter((a) => {
    return a.idCurrency === currencies.find((c) => c.isOcode === "USD").idCurrencyType;
  });
  const thirdSolesAccounts = thirdAccounts.filter((a) => {
    return a.idCurrency === currencies.find((c) => c.isOcode === "PEN").idCurrencyType;
  });
  const thirdDolaresAccounts = thirdAccounts.filter((a) => {
    return a.idCurrency === currencies.find((c) => c.isOcode === "USD").idCurrencyType;
  });

  return (
    <section className='h-full relative'>
      <h2>{props.formType === "editar" ? "Editar cuenta" : "Agregar cuenta"}</h2>
      <p>{props.formType === "editar" ? "Edita" : "Agrega"} la cuenta llenando el formulario.</p>
      <Formik
        initialValues={accountValues(props.formType === "agregar" ? {} : accDetails, props.isThird)}
        validationSchema={validateAccountForm}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isValid, values, touched, errors }) => (
          <Form className={classes.AccountForm}>
            <div className='flex items-start flex-wrap md:flex-no-wrap justify-center'>
              <FloatedInput
                type='select'
                name='idBank'
                value={values.idBank}
                touched={touched.idBank}
                error={errors.idBank}
                withIcon
                options={banksList(banks)}
                placeholder='Nombre del banco'
                className='w-full mr-3'
              />
              <FloatedInput
                name='accountNumber'
                id='accountNumber'
                type='text'
                label='Número de cuenta'
                className='w-full mr-3'
                value={values.accountNumber}
                touched={touched.accountNumber}
                error={errors.accountNumber}
              />
            </div>
            <div className='flex items-start flex-wrap md:flex-no-wrap justify-center'>
              <FloatedInput
                type='select'
                label='Tipo de cuenta'
                name='idBankAccountType'
                id='idBankAccountType'
                className='w-full mr-3'
                value={values.idBankAccountType}
                touched={touched.idBankAccountType}
                error={errors.idBankAccountType}
              >
                <option value=''>Selecciona una opción</option>
                <option value={1}>Corriente</option>
                <option value={2}>De Ahorros</option>
              </FloatedInput>
              <FloatedInput
                type='select'
                label='Moneda'
                name='idCurrencyType'
                id='idCurrencyType'
                className='w-full mr-3'
                value={values.idCurrencyType}
                touched={touched.idCurrencyType}
                error={errors.idCurrencyType}
              >
                <option value=''>Selecciona una opción</option>
                {!props.isThird ? (
                  <CurrencyTypesOptions
                    currencies={currencies}
                    solesAccounts={personalSolesAccounts}
                    dolaresAccounts={personalDolaresAccounts}
                    currencyType={props.currency}
                  />
                ) : (
                  <CurrencyTypesOptions
                    currencies={currencies}
                    solesAccounts={thirdSolesAccounts}
                    dolaresAccounts={thirdDolaresAccounts}
                    currencyType={props.currency}
                  />
                )}
              </FloatedInput>
            </div>
            <div className='flex items-start flex-start md:w-1/2 w-full'>
              <FloatedInput
                name='accountName'
                id='accountName'
                type='text'
                label={`Alias: ej. Nombre + Banco + Moneda`}
                className='w-full mr-3'
                value={values.accountName}
                touched={touched.accountName}
                error={errors.accountName}
              />
            </div>

            {props.isThird ? isThirdValues(values, touched, errors) : null}

            <div className='w-full flex justify-end mb-6 mt-3'>
              <Button type='submit' className={`submit-button mr-2 ld-over ${addLoading ? "running" : ""}`} disabled={addLoading || !isValid}>
                <span className='ld ld-ring ld-spin text-base' />
                <span className='mr-3'>
                  <RiCheckLine />
                </span>
                {props.formType === "editar" ? "Editar" : "Agregar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

const CurrencyTypesOptions = (props) => {
  const { currencies, solesAccounts, dolaresAccounts } = props;

  const solesCurrency = currencies.find((c) => c.isOcode === "PEN");
  const dolaresCurrency = currencies.find((c) => c.isOcode === "USD");

  return solesAccounts.length > 2 || props.currencyType === 1 ? (
    <option value={dolaresCurrency.idCurrencyType}>{dolaresCurrency.currencyName}</option>
  ) : dolaresAccounts.length > 2 || props.currencyType === 2 ? (
    <option value={solesCurrency.idCurrencyType}>{solesCurrency.currencyName}</option>
  ) : (
    currencies.map((c) => (
      <option key={c.idCurrencyType} value={c.idCurrencyType}>
        {c.currencyName}
      </option>
    ))
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAccount: (type, values) => dispatch(actions.addAccountInit(type, values)),
    editAccount: (type, values, id) => dispatch(actions.editAccountInit(type, values, id)),
  };
};

export default connect(null, mapDispatchToProps)(AccountForm);
