import * as actionTypes from "../actionTypes";

export const getActivityInit = () => ({
  type: actionTypes.GET_ACTIVITY_INIT,
});

export const getActivity = (currencyExchanges, cashAdvances) => ({
  type: actionTypes.GET_ACTIVITY_SUCCESS,
  currencyExchanges,
  cashAdvances,
});

export const getActivityError = () => ({
  type: actionTypes.GET_ACTIVITY_ERROR,
});

export const getExchangeDetailsInit = (id) => ({
  type: actionTypes.GET_EXCHANGE_DETAILS_INIT,
  id,
});

export const getExchangeDetails = (data) => ({
  type: actionTypes.GET_EXCHANGE_DETAILS_SUCCESS,
  data,
});

export const getAdvanceDetailsInit = (id) => ({
  type: actionTypes.GET_ADVANCE_DETAILS_INIT,
  id,
});

export const getAdvanceDetails = (data) => ({
  type: actionTypes.GET_ADVANCE_DETAILS_SUCCESS,
  data,
});

export const checkBalanceInit = (values, goNext, checkType) => ({
  type: actionTypes.CHECK_BALANCE_INIT,
  payload: { values, fn: goNext, checkType },
});

export const checkBalance = () => ({
  type: actionTypes.CHECK_BALANCE_SUCCESS,
});

export const checkBalanceFail = () => ({
  type: actionTypes.CHECK_BALANCE_FAILED,
});
