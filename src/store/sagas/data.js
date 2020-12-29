import { put, all, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import * as actions from "../actions/data";
import axios from "../../shared/axios";

function* getSchedule() {
  try {
    const res = yield axios.get("/Cliente/ObtenerHorario");
    if (res.status === 200) yield put(actions.getScheduleSuccess(res.data));
  } catch (error) {
    yield put(actions.getScheduleFail());
  }
}

export default function* () {
  yield all([takeEvery(actionTypes.GET_SCHEDULE_INIT, getSchedule)]);
}
