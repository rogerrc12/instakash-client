import React from "react";
import * as actions from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { RiCloseLine } from "react-icons/ri";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../Backdrop";
import Questions from "../../layout/Questions";

import classes from "./Modal.module.scss";

const QuestionsModal = () => {
  const showModal = useSelector((state) => state.modal.showQuestionsModal);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(actions.closeQuestionsModal());

  const timeout = { enter: 850, exit: 550 };

  return (
    <>
      <CSSTransition
        in={showModal}
        mountOnEnter
        unmountOnExit
        classNames="slide-up-down"
        timeout={timeout}
      >
        <div className={classes.Modal + " disable-scrollbars"}>
          <div className="w-full h-full relative">
            <button
              className={classes.Close + " rounded-lg"}
              onClick={closeModal}
            >
              <RiCloseLine />
            </button>
            <Questions />
          </div>
        </div>
      </CSSTransition>
      <Backdrop show={showModal} close={closeModal} />
    </>
  );
};

export default React.memo(QuestionsModal);
