import * as actionTypes from "../actionTypes";

const initialState = {
  currencyExchanges: [],
  cashAdvances: [],
  exchangeDetails: null,
  advanceDetails: null,
  isLoading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ACTIVITY_INIT:
      return { ...state, isLoading: true };

    case actionTypes.GET_ACTIVITY_SUCCESS:
      return { ...state, currencyExchanges: action.currencyExchanges, cashAdvances: action.cashAdvances, isLoading: false };

    case actionTypes.GET_ACTIVITY_ERROR:
      return { ...state, isLoading: false, exchangeDetails: null, advanceDetails: null };

    case actionTypes.GET_EXCHANGE_DETAILS_SUCCESS:
      return { ...state, exchangeDetails: action.data };

    case actionTypes.GET_ADVANCE_DETAILS_SUCCESS:
      return { ...state, advanceDetails: action.data };
    default:
      return state;
  }
}
