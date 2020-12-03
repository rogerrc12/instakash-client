import * as actionTypes from "../actionTypes";
const initialState = {
  questions: [],
  documentTypes: [],
  accountBanks: [],
  paymentBanks: [],
  currencies: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_BANKS_SUCCESS:
      return { ...state, accountBanks: action.accountBanks, paymentBanks: action.paymentBanks };
    case actionTypes.GET_BANKS_FAILED:
      return { ...state, banks: [] };

    case actionTypes.GET_DOCUMENTS_SUCCESS:
      return { ...state, documentTypes: action.types };
    case actionTypes.GET_DOCUMENTS_FAILED:
      return { ...state, documentTypes: [] };

    case actionTypes.GET_QUESTIONS_SUCCESS:
      return { ...state, questions: action.questions };
    case actionTypes.GET_QUESTIONS_FAILED:
      return { ...state, questions: [] };

    case actionTypes.GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: action.currencies };
    case actionTypes.GET_CURRENCIES_FAILED:
      return { ...state, currencies: [] };

    default:
      return state;
  }
}
