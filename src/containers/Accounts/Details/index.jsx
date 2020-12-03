import React, { useEffect } from "react";
import { Skeleton } from "antd";
import { connect, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

import classes from "./Details.module.scss";
import Button from "../../../components/UI/Button";

const Details = (props) => {
  const { getAccountDetails, id } = props;

  const { details, addLoading, detailsLoading } = useSelector((state) => state.accounts);

  useEffect(() => {
    getAccountDetails(id);
  }, [getAccountDetails, id]);

  const deleteAccount = () => props.deleteAccount(id);

  return (
    <section className={classes.DetailsWrapper}>
      <h2 className="mt-3">Detalles de mi cuenta</h2>
      <div className={classes.AccountDetails}>
        <Skeleton loading={detailsLoading} active paragraph>
          {details ? (
            <>
              <div className={classes.Details}>
                <h4>Nombre del banco</h4>
                <p>{details.bank}</p>
                <h4>Número de cuenta</h4>
                <p>{details.number}</p>
                <h4>Alias</h4>
                <p>{details.alias}</p>
              </div>
              <div className={classes.Details}>
                <h4>Moneda</h4>
                <p>{details.currency}</p>
                <h4>Tipo de cuenta</h4>
                <p>{details.type}</p>

                <p className={classes.AccGroup + " uppercase"}>{details.isThird ? "Terceros" : "Personal"}</p>
              </div>
            </>
          ) : null}
        </Skeleton>
      </div>
      <div className={classes.AccountActions}>
        <Button type="button" click={deleteAccount} className={`ld-over ${addLoading ? "running" : ""}`}>
          <span className="ld ld-ring ld-spin text-base" />
          <span className="mr-2">
            <FaRegTrashAlt />
          </span>
          Eliminar
        </Button>
        <Button type="button" click={() => props.edit(details.isThird, "editar")}>
          <span className="mr-2">
            <FiEdit2 />
          </span>
          Editar
        </Button>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccount: (id) => dispatch(actions.deleteAccountInit(id)),
    getAccountDetails: (accGroup, id) => dispatch(actions.getAccountDetailsInit(accGroup, id)),
  };
};

export default connect(null, mapDispatchToProps)(Details);
