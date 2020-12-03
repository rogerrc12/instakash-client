import * as actionTypes from "../actionTypes";

const initialState = { showModal: false, showQuestionsModal: false };

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return { showQuestionsModal: false, showModal: true };

    case actionTypes.SHOW_QUESTIONS_MODAL:
      return { showQuestionsModal: true, showModal: false };

    case actionTypes.HIDE_MODAL:
    case actionTypes.HIDE_QUESTIONS_MODAL:
      return initialState;
    default:
      return state;
  }
}
