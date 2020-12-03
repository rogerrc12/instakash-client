import React from "react";
import classes from "../../Activity.module.scss";

const MobileCard = (props) => {
  const openDetails = () => props.open(props.id, props.type);

  return (
    <div className={classes.MobileCard} onClick={openDetails}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className={classes.MobileInfo}>
            <h4>Pedido</h4>
            <p>{props.orderId}</p>
          </div>
          <div className={classes.MobileInfo + " ml-auto"}>
            <h4>Fecha</h4>
            <p>{props.date}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="flex items-center justify-end mr-3" style={{ color: props.statusColor }}>
            <div className={classes.StatusCircle} style={{ backgroundColor: props.statusColor }} />
            {props.status}
          </span>
          <span className="text-right font-bold text-base block mt-2 mr-4" style={{ color: props.statusColor }}>
            {props.amount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;
