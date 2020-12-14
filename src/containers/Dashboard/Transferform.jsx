import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { validateTransferNumber } from "../../shared/validations";
import { BsEnvelope, BsDownload } from "react-icons/bs";

import ErrorMessage from "../../components/AuthForm/Error";
import Button from "../../components/UI/Button";

import classes from "./Dashboard.module.scss";

const Transferform = (props) => {
  const { isLoading } = useSelector((state) => state.currencyExchange);

  const onSubmit = async (values) => {
    if (props.type === "exchange") {
      props.processExchange(props.id, values.transferNumber, props.connection);
    } else {
      props.processAdvance(values.transferNumber, props.id, props.connection);
    }
  };

  return (
    <>
      {props.statusId === 2 ? (
        <Formik initialValues={{ transferNumber: "" }} validationSchema={validateTransferNumber} onSubmit={onSubmit}>
          {({ isValid, errors, touched }) => (
            <Form className={classes.DetailsForm}>
              <h4 className='text-center text-xs black'>Ingresa el número de {props.type === "exchange" ? "Transferencia" : "pago u operación"}</h4>
              <div className={classes.TransferWrapper}>
                <Field name='transferNumber' className={errors.transferNumber && touched.transferNumber ? classes.ErrorMessage : ""} />
                <Button type='submit' disabled={!isValid} className={`ld-over ${isLoading ? "running" : ""}`}>
                  <span className='ld ld-ring ld-spin text-base' />
                  Enviar
                </Button>
              </div>
              <ErrorMessage name='transferNumber' />
            </Form>
          )}
        </Formik>
      ) : props.statusId === 3 ? (
        <Button type='button' className={classes.DownloadButton}>
          <span className='mr-3'>{props.type === "exchange" ? <BsEnvelope /> : <BsDownload />}</span>
          {props.type === "exchange" ? "Enviar a mi correo" : "Descargar Guia financiera"}
        </Button>
      ) : null}
    </>
  );
};

export default Transferform;
