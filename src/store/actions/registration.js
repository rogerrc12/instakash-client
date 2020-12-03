import * as actionTypes from "../actionTypes";

export const getQuestionsInit = () => ({
  type: actionTypes.GET_QUESTIONS_INIT,
});

export const getQuestions = (questions) => ({
  type: actionTypes.GET_QUESTIONS_SUCCESS,
  questions,
});

export const getQuestionsError = () => ({
  type: actionTypes.GET_QUESTIONS_FAILED,
});

export const getDocumentsInit = () => ({
  type: actionTypes.GET_DOCUMENTS_INIT,
});

export const getDocuments = (types) => ({
  type: actionTypes.GET_DOCUMENTS_SUCCESS,
  types,
});

export const getDocumentsError = () => ({
  type: actionTypes.GET_DOCUMENTS_FAILED,
});

export const getBanksInit = () => ({
  type: actionTypes.GET_BANKS_INIT,
});

export const getBanks = (accountBanks, paymentBanks) => ({
  type: actionTypes.GET_BANKS_SUCCESS,
  accountBanks,
  paymentBanks,
});

export const getBanksError = () => ({
  type: actionTypes.GET_BANKS_FAILED,
});

export const getCurrenciesInit = () => ({
  type: actionTypes.GET_CURRENCIES_INIT,
});

export const getCurrencies = (currencies) => ({
  type: actionTypes.GET_CURRENCIES_SUCCESS,
  currencies,
});

export const getCurrenciesError = () => ({
  type: actionTypes.GET_CURRENCIES_FAILED,
});
