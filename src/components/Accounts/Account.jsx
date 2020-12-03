import React from 'react';

import classes from './Accounts.module.scss';

const Account = (props) => {
  const classList = [classes.Account];

  if (props.idCurrency === 1) {
    classList.push(classes.DollarsBg);
  } else {
    classList.push(classes.SolesBg);
  }

  const openDetails = () => props.click(props.isThird, props.id);

  return (
    <div className={classList.join(' ') + ' p-5 my-3 md:mr-6'} onClick={openDetails}>
      <div className='flex flex-col justify-between h-full w-full'>
        <div className='w-10/12'>
          <h4 className='uppercase font-bold text-white'>{props.alias}</h4>
          <p className='text-xs mb-2'>{props.type}</p>
        </div>
        <p className='mt-auto text-sm'>
          Termina en{' '}
          <span className='tracking-widest ml-2'>{props.number.substring(props.number.length - 4, props.number.length)}</span>
        </p>
      </div>
      <span className={classes.Currency}>{props.currency}</span>
      <img src={'data:image/png;base64,' + props.image} alt={props.banco} />
    </div>
  );
};

export default React.memo(Account);
