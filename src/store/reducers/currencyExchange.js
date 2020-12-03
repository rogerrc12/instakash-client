import * as actionTypes from "../actionTypes";
const initialState = {
  prices: { buying: 0.0, selling: 0.0 },
  limits: { soles: 0.0, dolares: 0.0 },
  comisiones: { venta: 0, compra: 0 },
  exchangeRateId: null,
  isLoading: false,
  newExchange: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_EXCHANGE_PRICES_INIT:
    case actionTypes.CREATE_EXCHANGE_INIT:
    case actionTypes.PROCESS_EXCHANGE_INIT:
    case actionTypes.CANCEL_EXCHANGE_INIT:
    case actionTypes.CHECK_BALANCE_INIT:
      return { ...state, isLoading: true };

    case actionTypes.GET_EXCHANGE_PRICES_SUCCESS:
      return {
        ...state,
        prices: action.prices,
        limits: action.limits,
        comisiones: action.comisiones,
        exchangeRateId: action.exchangeId,
        isLoading: false,
      };

    case actionTypes.PROCESS_EXCHANGE_SUCCESS:
    case actionTypes.CANCEL_EXCHANGE_SUCCESS:
      return { ...state, isLoading: false, newExchange: {} };

    case actionTypes.CREATE_EXCHANGE_SUCCESS:
      return { ...state, newExchange: action.newExchange, isLoading: false, isBalance: false };

    case actionTypes.CREATE_EXCHANGE_FAILED:
    case actionTypes.PROCESS_EXCHANGE_FAILED:
    case actionTypes.CANCEL_EXCHANGE_FAILED:
    case actionTypes.CHECK_BALANCE_SUCCESS:
    case actionTypes.CHECK_BALANCE_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.GET_EXCHANGE_PRICES_ERROR:
    default:
      return state;
  }
}
