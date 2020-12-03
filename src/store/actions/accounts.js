import * as actionTypes from "../actionTypes";

export const getAccountsInit = () => ({ type: actionTypes.GET_ACCOUNTS_INIT });

export const getAccounts = (personalAccounts, thirdAccounts) => ({
  type: actionTypes.GET_ACCOUNTS_SUCCESS,
  personalAccounts,
  thirdAccounts,
});

export const getAccountsError = () => ({
  type: actionTypes.GET_ACCOUNTS_ERROR,
});

export const getAccountDetailsInit = (id) => ({
  type: actionTypes.GET_ACCOUNT_DETAILS_INIT,
  id,
});

export const getAccountDetails = (details) => ({
  type: actionTypes.GET_ACCOUNT_DETAILS_SUCCESS,
  details,
});

export const getAccountDetailsError = () => ({
  type: actionTypes.GET_ACCOUNT_DETAILS_SUCCESS,
});

export const addAccountInit = (values) => ({
  type: actionTypes.ADD_ACCOUNT_INIT,
  values,
});

export const addAccount = () => ({
  type: actionTypes.ADD_ACCOUNT_SUCCESS,
});

export const addAccountError = () => ({
  type: actionTypes.ADD_ACCOUNT_ERROR,
});

export const editAccountInit = (values, id) => ({
  type: actionTypes.EDIT_ACCOUNT_INIT,
  values,
  id,
});

export const editAccount = () => ({
  type: actionTypes.EDIT_ACCOUNT_SUCCESS,
});

export const editAccountError = () => ({
  type: actionTypes.EDIT_ACCOUNT_ERROR,
});

export const deleteAccountInit = (id) => ({
  type: actionTypes.DELETE_ACCOUNT_INIT,
  id,
});

export const deleteAccount = () => ({
  type: actionTypes.DELETE_ACCOUNT_SUCCESS,
});

export const deleteAccountError = () => ({
  type: actionTypes.DELETE_ACCOUNT_ERROR,
});

export const setIsThird = (value) => ({
  type: actionTypes.SET_IS_THIRD,
  value,
});

export const setCurrency = (currency) => ({
  type: actionTypes.SET_CURRENCY,
  currency,
});
