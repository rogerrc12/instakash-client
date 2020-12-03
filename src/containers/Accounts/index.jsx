import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import AccountsList from "./Accounts";
import AccountDetails from "./Details";
import AccountForm from "./Form";
import Modal from "../../components/UI/Modal";

import classes from "./Accounts.module.scss";

const Accounts = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("agregar");
  const [accId, setAccId] = useState(null);

  const isThird = useSelector((state) => state.accounts.isThird);

  const showFormHandler = (third, type) => {
    props.setIsThird(third);
    setFormType(type);
    setShowForm(true);
    props.openModal();
  };

  const showDetailsHandler = (third, id) => {
    setAccId(id);
    props.setIsThird(third);
    setShowForm(false);
    props.openModal();
  };

  const clearModal = () => {
    props.closeModal();
  };

  let modalComponent;

  if (showForm) {
    modalComponent = <AccountForm isThird={isThird} close={clearModal} formType={formType} />;
  } else {
    modalComponent = <AccountDetails id={accId} isThird={isThird} close={clearModal} edit={showFormHandler} />;
  }

  return (
    <>
      <main className={classes.Accounts}>
        <AccountsList openForm={showFormHandler} openDetails={showDetailsHandler} />
      </main>
      <Modal animationClassName="slide-up-down" close={clearModal}>
        {modalComponent}
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsThird: (value) => dispatch(actions.setIsThird(value)),
    openModal: () => dispatch(actions.openModal()),
    closeModal: () => dispatch(actions.closeModal()),
  };
};

export default connect(null, mapDispatchToProps)(Accounts);
