import * as actionTypes from "../actionTypes";

export const openModal = () => ({
  type: actionTypes.SHOW_MODAL,
});

export const closeModal = () => ({
  type: actionTypes.HIDE_MODAL,
});

export const openQuestionsModal = () => ({
  type: actionTypes.SHOW_QUESTIONS_MODAL,
});

export const closeQuestionsModal = () => ({
  type: actionTypes.HIDE_QUESTIONS_MODAL,
});
