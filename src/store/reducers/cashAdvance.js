import * as actionTypes from "../actionTypes";
const initialState = {
  limits: { soles: 990, dolares: 500 },
  rate: 10,
  isLoading: false,
  newAdvanceId: null,
  paymentLink: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ADVANCE_LIMITS_SUCCESS:
      return { ...state, limits: action.limits, rate: action.rate };

    case actionTypes.CREATE_ADVANCE_INIT:
    case actionTypes.PROCESS_ADVANCE_INIT:
    case actionTypes.CHECK_BALANCE_INIT:
    case actionTypes.VALIDATE_USER_LIMIT_INIT:
      return { ...state, isLoading: true };

    case actionTypes.CREATE_ADVANCE_SUCCESS:
      return { ...state, isLoading: false, newAdvanceId: action.id, paymentLink: action.link };

    case actionTypes.CREATE_ADVANCE_FAILED:
    case actionTypes.PROCESS_ADVANCE_SUCCESS:
      return { ...state, isLoading: false, newAdvanceId: null, paymentLink: null };

    case actionTypes.PROCESS_ADVANCE_FAILED:
    case actionTypes.CHECK_BALANCE_SUCCESS:
    case actionTypes.CHECK_BALANCE_FAILED:
    case actionTypes.VALIDATE_USER_LIMIT_SUCCESS:
    case actionTypes.VALIDATE_USER_LIMIT_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.GET_ADVANCE_LIMITS_FAILED:
    default:
      return state;
  }
}
