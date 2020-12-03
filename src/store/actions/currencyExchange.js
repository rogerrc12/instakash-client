import * as actionTypes from "../actionTypes";

export const getPricesInit = () => ({
  type: actionTypes.GET_EXCHANGE_PRICES_INIT,
});

export const getPrices = (prices, limits, comisiones, exchangeId) => ({
  type: actionTypes.GET_EXCHANGE_PRICES_SUCCESS,
  prices,
  limits,
  comisiones,
  exchangeId,
});

export const getPricesError = () => ({
  type: actionTypes.GET_EXCHANGE_PRICES_ERROR,
});

export const createExchangeInit = (values, goStep) => ({
  type: actionTypes.CREATE_EXCHANGE_INIT,
  values,
  goStep,
});

export const createExchange = (newExchange) => ({
  type: actionTypes.CREATE_EXCHANGE_SUCCESS,
  newExchange,
});

export const createExchangeError = () => ({
  type: actionTypes.CREATE_EXCHANGE_FAILED,
});

export const processExchangeInit = (id, transferNumber, goStep) => ({
  type: actionTypes.PROCESS_EXCHANGE_INIT,
  id,
  transferNumber,
  goStep,
});

export const processExchange = () => ({
  type: actionTypes.PROCESS_EXCHANGE_SUCCESS,
});

export const processExchangeError = () => ({
  type: actionTypes.PROCESS_EXCHANGE_FAILED,
});

export const cancelExchangeInit = (id) => ({
  type: actionTypes.CANCEL_EXCHANGE_INIT,
  id,
});

export const cancelExchange = () => ({
  type: actionTypes.CANCEL_EXCHANGE_SUCCESS,
});

export const cancelExchangeError = () => ({
  type: actionTypes.CANCEL_EXCHANGE_FAILED,
});
