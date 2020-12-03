import * as actionTypes from '../actionTypes';

export const setAuthComponent = (component) => ({
  type: actionTypes.SET_AUTH_COMPONENT,
  component,
});

export const setGoogleRegistration = (values) => ({
  type: actionTypes.SET_GOOGLE_REGISTRATION,
  values,
});

export const registerUserInit = (values) => ({
  type: actionTypes.REGISTER_INIT,
  values,
});

export const registerUser = (token) => ({
  type: actionTypes.REGISTER_SUCCESS,
  token,
});

export const loginUserInit = (values) => ({
  type: actionTypes.LOGIN_INIT,
  values,
});

export const loginUser = (token) => ({
  type: actionTypes.LOGIN_SUCCESS,
  token,
});

export const loginUserFail = () => ({
  type: actionTypes.LOGIN_FAILED,
});

export const loginGoogleInit = (token) => ({
  type: actionTypes.LOGIN_GOOGLE_INIT,
  token,
});

export const logoutInit = () => ({
  type: actionTypes.LOGOUT_INIT,
});

export const logout = () => ({
  type: actionTypes.LOGOUT_SUCCESS,
});

export const logoutFailed = () => ({
  type: actionTypes.LOGIN_FAILED,
});

export const registerUserFail = () => ({
  type: actionTypes.REGISTER_FAILED,
});

export const loadUserInit = () => ({
  type: actionTypes.GET_USER_INIT,
});

export const loadUser = (user) => ({
  type: actionTypes.GET_USER_SUCCESS,
  user,
});

export const loadUserFail = () => ({
  type: actionTypes.GET_USER_FAILED,
});

export const sendPasswordEmailInit = (email) => ({
  type: actionTypes.SENT_PASSWORD_EMAIL_INIT,
  email,
});

export const sendPasswordEmail = () => ({
  type: actionTypes.SENT_PASSWORD_EMAIL_SUCCESS,
});

export const sendPasswordEmailFail = () => ({
  type: actionTypes.SENT_PASSWORD_EMAIL_FAILED,
});

export const validatePasswordChangeInit = (token) => ({
  type: actionTypes.VALIDATE_PASSWORD_CHANGE_INIT,
  token,
});

export const changePasswordInit = (password, userId) => ({
  type: actionTypes.CHANGE_PASSWORD_INIT,
  password,
  userId,
});

export const changePassword = () => ({
  type: actionTypes.CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFail = () => ({
  type: actionTypes.CHANGE_PASSWORD_FAILED,
});

export const changePhoneNumberInit = (phoneNumber) => ({
  type: actionTypes.CHANGE_PHONE_INIT,
  phoneNumber,
});

export const changePhoneNumber = () => ({
  type: actionTypes.CHANGE_PHONE_SUCCESS,
});

export const changePhoneNumberFail = () => ({
  type: actionTypes.CHANGE_PASSWORD_FAILED,
});

export const changeAddressInit = (address) => ({
  type: actionTypes.CHANGE_ADDRESS_INIT,
  address,
});

export const changeAddress = () => ({
  type: actionTypes.CHANGE_ADDRESS_SUCCESS,
});

export const changeAddressFail = () => ({
  type: actionTypes.CHANGE_ADDRESS_FAILED,
});

export const checkAuthTimeout = (expTime) => ({
  type: actionTypes.CHECK_AUTH_TIMEOUT,
  expTime,
});

export const updateProfileInit = (values) => ({
  type: actionTypes.UPDATE_PROFILE_INIT,
  values,
});

export const updateProfile = () => ({
  type: actionTypes.UPDATE_PROFILE_SUCCESS,
});

export const updateProfileFail = () => ({
  type: actionTypes.UPDATE_PROFILE_FAILED,
});
