import React from "react";
import SwipeableViews from "react-swipeable-views";
import { isMobile } from "react-device-detect";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Account from "./Account";

import classes from "./Accounts.module.scss";

const AccountsList = (props) => {
  const dollarsAccounts = props.accounts.filter((account) => account.idCurrency === 1);
  const solesAccounts = props.accounts.filter((account) => account.idCurrency === 2);

  let usdAccounts = dollarsAccounts.map((account, i) => (
    <Account key={i} click={props.open} isThird={props.isThird} {...account} />
  ));

  let penAccounts = solesAccounts.map((account, i) => (
    <Account key={i} click={props.open} isThird={props.isThird} {...account} />
  ));

  return isMobile ? (
    <>
      <div className={classes.AccountsList}>
        <SwipeableViews style={{ padding: "0px 30px 0px 15px" }} slideStyle={{ padding: "0" }}>
          {usdAccounts}
        </SwipeableViews>
      </div>
      <div className={classes.AccountsList}>
        <SwipeableViews style={{ padding: "0px 30px 0px 15px" }} slideStyle={{ padding: "0" }}>
          {penAccounts}
        </SwipeableViews>
      </div>
    </>
  ) : (
    <>
      <TransitionGroup className={classes.AccountsList} component="div">
        {dollarsAccounts.map((account, i) => (
          <CSSTransition key={i} classNames="fade-right" timeout={1000 * i + 1}>
            <Account key={i} {...account} click={props.open} isThird={props.isThird} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <TransitionGroup className={classes.AccountsList} component="div">
        {solesAccounts.map((account, i) => (
          <CSSTransition key={i} classNames="fade-right" timeout={1000 * i + 1}>
            <Account {...account} key={i} click={props.open} isThird={props.isThird} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

export default AccountsList;
