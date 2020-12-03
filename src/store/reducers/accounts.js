import * as actionTypes from "../actionTypes";

const initialState = {
  personalAccounts: [],
  thirdAccounts: [],
  details: {},
  isThird: false,
  currency: null,
  isLoading: false,
  detailsLoading: false,
  addLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_ACCOUNT_INIT:
    case actionTypes.EDIT_ACCOUNT_INIT:
    case actionTypes.DELETE_ACCOUNT_INIT:
      return { ...state, addLoading: true };

    case actionTypes.GET_ACCOUNTS_INIT:
      return { ...state, isLoading: true };

    case actionTypes.GET_ACCOUNT_DETAILS_INIT:
      return { ...state, detailsLoading: true };

    case actionTypes.GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        personalAccounts: action.personalAccounts,
        thirdAccounts: action.thirdAccounts,
        isLoading: false,
      };
    case actionTypes.GET_ACCOUNTS_ERROR:
      return { ...state, personalAccounts: [], thirdAccounts: [] };

    case actionTypes.GET_ACCOUNT_DETAILS_SUCCESS:
      return { ...state, details: action.details, detailsLoading: false };
    case actionTypes.GET_ACCOUNT_DETAILS_ERROR:
      return { ...state, details: {}, detailsLoading: false };

    case actionTypes.ADD_ACCOUNT_SUCCESS:
    case actionTypes.EDIT_ACCOUNT_SUCCESS:
    case actionTypes.DELETE_ACCOUNT_SUCCESS:
      return { ...state, addLoading: false };

    case actionTypes.ADD_ACCOUNT_ERROR:
    case actionTypes.EDIT_ACCOUNT_ERROR:
    case actionTypes.DELETE_ACCOUNT_ERROR:
      return { ...state, addLoading: false };

    case actionTypes.SET_IS_THIRD:
      return { ...state, isThird: action.value };

    case actionTypes.SET_CURRENCY:
      return { ...state, currency: action.currency };

    case actionTypes.LOGOUT_SUCCESS:
    default:
      return state;
  }
}
