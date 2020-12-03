import React from 'react';
import { validateEmailExistance } from '../../../../shared/validations';
import { RiNewspaperLine } from 'react-icons/ri';
import { BsCardChecklist } from 'react-icons/bs';
import { FaRegEnvelope, FaArrowRight, FaRegMap } from 'react-icons/fa';
import { FiSmartphone } from 'react-icons/fi';

import Input from '../../../../components/AuthForm/Input';
import Button from '../../../../components/UI/Button';

import classes from '../SignUp.module.scss';

const Step1 = (props) => {
  const { CompanyName: cname, RUCNumber: rnumber, Email: em, PhoneNumber: pnumber } = props.values;
  const { CompanyName, RUCNumber, Email, PhoneNumber } = props.errors;

  const isValid = cname.length > 0 && rnumber.length > 0 && em.length > 0 && pnumber.length > 0 && !CompanyName && !RUCNumber && !Email && !PhoneNumber;

  return (
    <>
      <Input name='CompanyName' label='Razón social' icon={RiNewspaperLine} touched={props.touched.CompanyName} error={props.errors.CompanyName} />
      <Input name='RUCNumber' label='RUC' icon={BsCardChecklist} touched={props.touched.RUCNumber} error={props.errors.RUCNumber} />
      <Input
        name='Email'
        type='email'
        label='Correo'
        icon={FaRegEnvelope}
        touched={props.touched.Email}
        error={props.errors.Email}
        validate={validateEmailExistance}
      />
      <Input name='Address' type='text' label='Dirección fiscal' icon={FaRegMap} touched={props.touched.Address} error={props.errors.Address} />
      <Input name='PhoneNumber' label='Teléfono' type='text' touched={props.touched.PhoneNumber} error={props.errors.PhoneNumber} icon={FiSmartphone} />
      <Button type='button' className={classes.Continue + ' w-full flex justify-center items-center mt-8'} click={props.continue} disabled={!isValid}>
        Continuar{' '}
        <span className='ml-2'>
          <FaArrowRight />
        </span>
      </Button>
    </>
  );
};

export default Step1;
