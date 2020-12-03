import React from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { GoPlus } from "react-icons/go";

import AccountsList from "../../components/Accounts/AccountsList";
import Button from "../../components/UI/Button";

import classes from "./Accounts.module.scss";

const Accounts = (props) => {
  const personalAccounts = props.accounts.personalAccounts;
  const thirdAccounts = props.accounts.thirdAccounts;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4 pl-4 md:pl-2 mb-2">
        <div className="mb-2 w-8/12 md-w-full">
          <h2 className="text-base md:text-lg font-bold">Cuentas propias</h2>
          <p>Máximo 3 cuentas por divisa.</p>
        </div>
        {personalAccounts.length < 6 ? (
          <Button
            type="button"
            className={classes.AddButton + " flex justify-between items-center"}
            click={() => props.openForm(false, "agregar")}
          >
            {isMobile ? "Agregar" : "Agregar cuenta"}
            <span className="ml-2">
              <GoPlus />
            </span>
          </Button>
        ) : null}
      </div>
      <AccountsList accounts={personalAccounts} isThird={false} open={props.openDetails} />
      <div className="flex justify-between items-center py-4 pl-4 md:pl-2 mt-4 mb-2">
        <div className="mb-2 w-8/12 md-w-full">
          <h2 className="text-base md:text-lg font-bold">Cuentas de terceros</h2>
          <p>Máximo 3 cuentas por divisa.</p>
        </div>
        {thirdAccounts.length < 6 ? (
          <Button
            type="button"
            className={classes.AddButton + " flex justify-between items-center"}
            click={() => props.openForm(true, "agregar")}
          >
            {isMobile ? "Agregar" : "Agregar cuenta"}
            <span className="ml-2">
              <GoPlus />
            </span>
          </Button>
        ) : null}
      </div>
      <AccountsList accounts={thirdAccounts} isThird={true} open={props.openDetails} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccounts: () => dispatch(actions.getAccountsInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
