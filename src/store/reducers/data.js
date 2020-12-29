import * as actionTypes from "../actionTypes";
const initialState = {
  schedule: [],
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case actionTypes.GET_SCHEDULE_SUCCESS:
      return { ...state, schedule: action.data };

    case actionTypes.GET_SCHEDULE_FAILED:
      return { ...state, schedule: [] };

    default:
      return state;
  }
}
