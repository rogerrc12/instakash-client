import { all } from "redux-saga/effects";
import accountsSaga from "./accounts";
import activitySagas from "./activity";
import registrationSagas from "./registration";
import authSagas from "./auth";
import currencyExchangeSagas from "./currencyExchange";
import cashAdvanceSagas from "./cashAdvance";
import dataSagas from "./data";

export default function* rootSaga() {
  yield all([registrationSagas(), accountsSaga(), activitySagas(), authSagas(), currencyExchangeSagas(), cashAdvanceSagas(), dataSagas()]);
}
