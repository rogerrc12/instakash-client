import React, { useState, useEffect } from "react";
import * as actions from "../../store/actions";
import { connect, useSelector } from "react-redux";
// import { AiOutlineWarning } from "react-icons/ai";

import ActivityTables from "../../components/Activity";
import Details from "./Details";
import Modal from "../../components/UI/Modal";

import classes from "./Dashboard.module.scss";

const Dashboard = (props) => {
  const { getActivity } = props;

  const { currencyExchanges, cashAdvances, isLoading } = useSelector((state) => state.activity);

  useEffect(() => {
    getActivity();
  }, [getActivity]);

  const [detailsType, setDetailsType] = useState(null);
  const [detailsId, setDetailsId] = useState(null);

  const openDetails = (id, type) => {
    setDetailsType(type);
    setDetailsId(id);
    props.openModal();
  };

  const clearModal = () => props.closeModal();

  return (
    <>
      <main className={classes.Dashboard}>
        {/* <div
          style={{ margin: "0 auto", height: "100%", width: "80%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}
        >
          <span style={{ color: "#f56565", marginBottom: "20px" }}>
            <AiOutlineWarning size={100} />
          </span>
          <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#f56565", fontWeight: "bold" }}>
            Estamos presentando problemas para mostrar su actividad. <br /> Trabajamos arduamente para solucionarlo.
          </h2>
          <p style={{ fontSize: "17px" }}>
            <strong>Todas sus solicitudes están siendo recibidas con normalidad. Puede escribirnos a nuestro contacto para ver el estado de su solicitud.</strong>
          </p>
        </div> */}
        <ActivityTables isLoading={isLoading} CEdata={currencyExchanges} CAdata={cashAdvances} open={openDetails} />
      </main>
      <Modal animationClassName='slide-right-left' close={clearModal} className={classes.DetailsModal}>
        <Details id={detailsId} type={detailsType} />
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(actions.openModal()),
    closeModal: () => dispatch(actions.closeModal()),
    getActivity: () => dispatch(actions.getActivityInit()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
