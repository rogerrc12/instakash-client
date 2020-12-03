import { combineReducers } from "redux";
import registration from "./registration";
import { LOGOUT_SUCCESS } from "../actionTypes";
import modal from "./modal";
import accounts from "./accounts";
import activity from "./activity";
import auth from "./auth";
import currencyExchange from "./currencyExchange";
import cashAdvance from "./cashAdvance";

const appReducer = combineReducers({
  registration,
  auth,
  modal,
  accounts,
  activity,
  currencyExchange,
  cashAdvance,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
