import * as actionTypes from "../actionTypes";

export const getLimitsInit = () => ({
  type: actionTypes.GET_ADVANCE_LIMITS_INIT,
});

export const getLimits = (rate, limits) => ({
  type: actionTypes.GET_ADVANCE_LIMITS_SUCCESS,
  rate,
  limits,
});

export const getLimitsFail = () => ({
  type: actionTypes.GET_ADVANCE_LIMITS_FAILED,
});

export const createAdvanceInit = (values, goStep) => ({
  type: actionTypes.CREATE_ADVANCE_INIT,
  values,
  goStep,
});

export const createAdvance = (id, link) => ({
  type: actionTypes.CREATE_ADVANCE_SUCCESS,
  id,
  link,
});

export const createAdvanceFail = () => ({
  type: actionTypes.CREATE_ADVANCE_FAILED,
});

export const processAdvanceInit = (number, id, goStep = null) => ({
  type: actionTypes.PROCESS_ADVANCE_INIT,
  number,
  id,
  goStep,
});

export const processAdvance = () => ({
  type: actionTypes.PROCESS_ADVANCE_SUCCESS,
});

export const processAdvanceFailed = () => ({
  type: actionTypes.PROCESS_ADVANCE_FAILED,
});

export const cancelAdvanceInit = (id, goStep = null) => ({
  type: actionTypes.CANCEL_ADVANCE_INIT,
  id,
  goStep,
});

export const cancelAdvance = () => ({
  type: actionTypes.CANCEL_ADVANCE_SUCCESS,
});

export const cancelAdvanceFail = () => ({
  type: actionTypes.CANCEL_ADVANCE_FAILED,
});

export const validateLimitInit = (values, goNext) => ({
  type: actionTypes.VALIDATE_USER_LIMIT_INIT,
  values,
  goNext,
});

export const validateLimit = () => ({
  type: actionTypes.VALIDATE_USER_LIMIT_SUCCESS,
});

export const validateLimitFail = () => ({
  type: actionTypes.VALIDATE_USER_LIMIT_FAILED,
});
