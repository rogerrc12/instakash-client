import React, { useState } from 'react';

import { AiOutlineEdit } from 'react-icons/ai';

import ProfilePhoto from '../../components/UI/ProfilePhoto';
import PasswordChangeForm from './PasswordChange';
import AddressChangeForm from './AddressChange';
import PhoneNumberChange from './PhoneNumberChange';

import classes from './Profile.module.scss';

const ProfileDetails = (props) => {
  const [changePassword, setChangePassword] = useState(false);

  const togglePasswordHandler = () => setChangePassword((prevState) => !prevState);

  const address = !props.user.address ? (
    <>
      <span className='error-msg'>Debes agregar la dirección fiscal de la empresa para poder continuar.</span>
      <AddressChangeForm />
    </>
  ) : (
    <p className='md:mt-3'>{props.user.address}</p>
  );

  return (
    <div className={classes.Details}>
      <h2>Información personal</h2>

      <div className={classes.ProfileInfo}>
        <ProfilePhoto photo={props.user.photoURL} />
        <div className='my-3 md:ml-4'>
          <h4>{props.user.name}</h4>
          <p>{props.user.email}</p>
          <p style={{ color: '#444', fontWeight: 'normal' }}>Si desea modificar algún dato de su perfil, por favor comuníquese con soporte.</p>
        </div>
      </div>

      <div className='flex flex-col md:flex-row'>
        <div className={classes.ProfileInfoWrapper}>
          <h4>ID</h4>
          <p>{props.user.clientId}</p>
        </div>

        <div className={classes.ProfileInfoWrapper}>
          <h4>Nombre</h4>
          <p>{props.user.name}</p>
        </div>

        <div className={classes.ProfileInfoWrapper}>
          <h4>Email</h4>
          <p>{props.user.email}</p>
        </div>
      </div>

      {props.user.companyName ? (
        <div className='flex flex-col md:flex-row mt-8'>
          <div className={classes.ProfileInfoWrapper}>
            <h4>Nombre de empresa</h4>
            <p className='md:mt-3'>{props.user.companyName}</p>
          </div>
          <div className={classes.ProfileInfoWrapper}>
            <h4>RUC</h4>
            <p className='md:mt-3'>{props.user.rucNumber}</p>
          </div>
          <div className={classes.ProfileInfoWrapper}>
            <h4>Dirección fiscal</h4>
            {address}
          </div>
        </div>
      ) : null}

      <div className='flex flex-col md:flex-row'>
        <div className={`${classes.ProfileInfoWrapper} mt-8 mr-2  ${changePassword ? 'w-56' : ''}`}>
          <h4>Contraseña</h4>
          {changePassword ? (
            <PasswordChangeForm />
          ) : (
            <p className='flex justify-start items-center'>
              <span className='text-3xl'>&#183; &#183; &#183; &#183; &#183; &#183; &#183; &#183;</span>
              <button onClick={togglePasswordHandler} className='text-base ml-2'>
                <AiOutlineEdit />
              </button>
            </p>
          )}
        </div>
        <div className={classes.ProfileInfoWrapper + ' mt-8 md:w-56'}>
          <h4>Número de teléfono</h4>
          {!props.user.phoneNumber ? <span className='error-msg'>Debes poder agregar un número de teléfono para hacer una operación.</span> : null}
          {!props.user.phoneNumber ? <PhoneNumberChange /> : <p className='md:mt-3'>{props.user.phoneNumber}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
