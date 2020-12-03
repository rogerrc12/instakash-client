import React from "react";
import Table from "../../UI/Table/SimpleTable";

import classes from "../Activity.module.scss";

const columns = [
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status, row) => {
      const { statusColor } = row;

      return (
        <span style={{ color: statusColor, display: "flex", alignItems: "center", fontSize: ".7rem", fontWeight: "bold" }}>
          <div className={classes.StatusCircle} style={{ backgroundColor: statusColor }} /> {status}
        </span>
      );
    },
  },
  {
    title: "Número de pedido",
    dataIndex: "orderId",
    key: "orderId",
    render: (value, row) => value,
  },
  {
    title: "Fecha",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Monto pagado",
    dataIndex: "amountToPay",
    key: "amountToPay",
    render: (amount, row) => {
      const { statusColor } = row;

      return <span style={{ color: statusColor, fontWeight: "bold" }}>{amount}</span>;
    },
  },
  {
    title: "Devolución",
    dataIndex: "amountToReceive",
    key: "amountToReceive",
    render: (amount, row) => {
      const { statusColor } = row;

      return <span style={{ color: statusColor, fontWeight: "bold" }}>{amount}</span>;
    },
  },
];

const CashAdvances = (props) => {
  const data = props.data.map((data) => ({
    key: data.id,
    status: data.status.toUpperCase(),
    statusColor: data.statusColor,
    orderId: data.orderId,
    date: data.date,
    amountToPay: data.amountToPay,
    amountToReceive: data.amountToReceive,
  }));

  return <Table isLoading={props.isLoading} columns={columns} data={data} click={props.open} type='advance' />;
};

export default CashAdvances;
