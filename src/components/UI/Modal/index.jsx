import React from "react";
import * as actions from "../../../store/actions";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { RiCloseLine } from "react-icons/ri";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../Backdrop";

import classes from "./Modal.module.scss";

const Modal = (props) => {
  const showModal = useSelector((state) => state.modal.showModal);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(actions.closeModal());

  const timeout = { enter: 850, exit: 550 };

  return (
    <>
      <CSSTransition in={showModal} mountOnEnter unmountOnExit classNames={props.animationClassName} timeout={timeout}>
        <div className={`${classes.Modal} ${props.className ? props.className : ""} disable-scrollbars`}>
          <div className="w-full h-full relative">
            <button className={classes.Close + " rounded-lg "} onClick={closeModal}>
              <RiCloseLine />
            </button>
            {props.children}
          </div>
        </div>
      </CSSTransition>
      <Backdrop show={showModal} close={closeModal} />
    </>
  );
};

Modal.propTypes = {
  animationClassName: PropTypes.string.isRequired,
};

export default React.memo(Modal);
