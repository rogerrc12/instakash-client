import React from "react";
import { validateEmailExistance } from "../../../../shared/validations";
import { FiUser, FiUsers, FiSmartphone } from "react-icons/fi";
import { FaRegEnvelope, FaArrowRight } from "react-icons/fa";

import Input from "../../../../components/AuthForm/Input";
import Button from "../../../../components/UI/Button";

import classes from "../SignUp.module.scss";

const Step1 = (props) => {
  const { FirstName: fname, LastName: lname, Email: em, PhoneNumber: pnumber } = props.values;

  const { FirstName, LastName, Email, PhoneNumber } = props.errors;

  const isValid =
    fname.length > 0 &&
    lname.length > 0 &&
    em.length > 0 &&
    pnumber.length > 0 &&
    !FirstName &&
    !LastName &&
    !Email &&
    !PhoneNumber;

  return (
    <>
      <Input
        name="FirstName"
        label="Primer Nombre"
        type="text"
        touched={props.touched.FirstName}
        error={props.errors.FirstName}
        icon={FiUser}
      />
      <Input
        name="LastName"
        label="Primer Apellido"
        type="text"
        touched={props.touched.LastName}
        error={props.errors.LastName}
        icon={FiUsers}
      />
      <Input
        name="Email"
        type="email"
        label="Correo"
        icon={FaRegEnvelope}
        touched={props.touched.Email}
        error={props.errors.Email}
        validate={validateEmailExistance}
      />
      <Input
        name="PhoneNumber"
        label="Teléfono"
        type="text"
        touched={props.touched.PhoneNumber}
        error={props.errors.PhoneNumber}
        icon={FiSmartphone}
      />
      <Button
        type="button"
        className={classes.Continue + " w-full flex justify-center items-center mt-8"}
        click={props.continue}
        disabled={!isValid}
      >
        Continuar{" "}
        <span className="ml-2">
          <FaArrowRight />
        </span>
      </Button>
    </>
  );
};

export default Step1;
