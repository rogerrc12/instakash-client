import React from 'react';
import { connect, useSelector } from 'react-redux';
import * as Yup from 'yup';
import * as actions from '../../store/actions';
import { Formik, Form } from 'formik';
import { FiMap } from 'react-icons/fi';

import Input from '../../components/AuthForm/Input';
import Button from '../../components/UI/Button';

import classes from './Profile.module.scss';

const validateAddress = Yup.object().shape({
  Address: Yup.string().required('Debes colocar la dirección fiscal.'),
});

const AddressChange = (props) => {
  const onSubmit = (values) => props.changeAddress(values.Address);
  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <Formik initialValues={{ Address: '' }} validationSchema={validateAddress} onSubmit={onSubmit}>
      {({ isValid, touched, errors }) => (
        <Form className={classes.FormChange}>
          <Input label='Dirección Fiscal' icon={FiMap} touched={touched.Address} error={errors.Address} name='Address' />
          <Button type='submit' disabled={!isValid} className={`w-full mt-3 ld-over ${isLoading ? 'running' : ''}`}>
            <span className='ld ld-ring ld-spin text-base' />
            Agregar dirección
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeAddress: (address) => dispatch(actions.changeAddressInit(address)),
});

export default connect(null, mapDispatchToProps)(AddressChange);
