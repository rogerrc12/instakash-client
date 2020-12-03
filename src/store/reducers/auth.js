import * as actionTypes from "../actionTypes";

const initialState = {
  authComponent: null,
  googleRegistration: {},
  token: localStorage.getItem("idToken"),
  user: {},
  isAuth: false,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_INIT:
    case actionTypes.LOGIN_INIT:
    case actionTypes.GET_USER_INIT:
    case actionTypes.LOGIN_GOOGLE_INIT:
    case actionTypes.CHANGE_PASSWORD_INIT:
    case actionTypes.SENT_PASSWORD_EMAIL_INIT:
    case actionTypes.CHANGE_PHONE_INIT:
    case actionTypes.UPDATE_PROFILE_INIT:
    case actionTypes.CHANGE_ADDRESS_INIT:
      return { ...state, isLoading: true };

    case actionTypes.SET_AUTH_COMPONENT:
      return { ...state, authComponent: action.component, isLoading: false };

    case actionTypes.SET_GOOGLE_REGISTRATION:
      return { ...state, googleRegistration: action.values, isLoading: false };

    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, token: action.token, googleRegistration: {} };

    case actionTypes.REGISTER_FAILED:
    case actionTypes.LOGIN_FAILED:
    case actionTypes.GET_USER_FAILED:
    case actionTypes.LOGOUT_SUCCESS:
      return { ...state, user: {}, googleRegistration: {}, isAuth: false, token: null, isLoading: false };

    case actionTypes.CHANGE_PASSWORD_SUCCESS:
    case actionTypes.CHANGE_PASSWORD_FAILED:
    case actionTypes.SENT_PASSWORD_EMAIL_SUCCESS:
    case actionTypes.SENT_PASSWORD_EMAIL_FAILED:
    case actionTypes.CHANGE_PHONE_SUCCESS:
    case actionTypes.CHANGE_PHONE_FAILED:
    case actionTypes.UPDATE_PROFILE_SUCCESS:
    case actionTypes.UPDATE_PROFILE_FAILED:
    case actionTypes.CHANGE_ADDRESS_SUCCESS:
    case actionTypes.CHANGE_ADDRESS_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.GET_USER_SUCCESS:
      return { ...state, user: action.user, googleRegistration: {}, isAuth: true, isLoading: false };

    default:
      return state;
  }
}
