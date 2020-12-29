import * as actionTypes from "../actionTypes";

export const getSchedule = () => ({
  type: actionTypes.GET_SCHEDULE_INIT,
});

export const getScheduleSuccess = (data) => ({
  type: actionTypes.GET_SCHEDULE_SUCCESS,
  data,
});

export const getScheduleFail = () => ({
  type: actionTypes.GET_SCHEDULE_FAILED,
});
