import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";

const WarningSweetAlert = (props) => {
  return (
    <SweetAlert
      show={props.show}
      title={props.title}
      customClass="sweetalert"
      warning
      showCancel
      confirmBtnCssClass="success-btn"
      cancelBtnCssClass="danger-btn"
      confirmBtnText={props.confirmText}
      cancelBtnText={props.cancelBtnText}
      onConfirm={props.confirm}
      onCancel={props.cancel}
    >
      {props.children}
    </SweetAlert>
  );
};

WarningSweetAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  cancel: PropTypes.func.isRequired,
};

export default React.memo(WarningSweetAlert);
