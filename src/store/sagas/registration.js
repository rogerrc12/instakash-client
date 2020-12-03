import { takeLatest, all, put } from "redux-saga/effects";
import axios from "../../shared/axios";
import * as actionTypes from "../actionTypes";
import * as actions from "../actions/registration";

function* getQuestions() {
  try {
    const res = yield axios.get("/Usuario/ObtenerPreguntas");
    const questions = res.data;
    if (questions === true) {
      yield put(actions.getQuestionsError());
    } else {
      yield put(actions.getQuestions(questions));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getDocumentTypes() {
  try {
    const res = yield axios.get("/Usuario/ObtenerDocumentType");
    const documentTypes = res.data;
    if (documentTypes === true) {
      yield put(actions.getDocumentsError());
    } else {
      yield put(actions.getDocuments(documentTypes));
    }
  } catch (error) {
    console.log(error);
  }
}

function* getBanks() {
  try {
    const res = yield axios.get("/Banco/ObtenerBancos");
    const banks = res.data;
    if (banks === true) {
      yield put(actions.getBanksError());
    } else {
      const accountBanks = res.data.filter((bank) => bank.isAccount);
      const paymentBanks = res.data.filter((bank) => bank.ispayments);
      yield put(actions.getBanks(accountBanks, paymentBanks));
    }
  } catch (error) {
    console.error(error);
  }
}

function* getCurrencies() {
  try {
    const res = yield axios.get("/CuentaBanco/ObtenerMonedas");
    const currencies = res.data;
    if (currencies === 1) {
      yield put(actions.getCurrenciesError());
    } else {
      yield put(actions.getCurrencies(currencies));
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* watchRegistration() {
  yield all([
    takeLatest(actionTypes.GET_QUESTIONS_INIT, getQuestions),
    takeLatest(actionTypes.GET_DOCUMENTS_INIT, getDocumentTypes),
    takeLatest(actionTypes.GET_BANKS_INIT, getBanks),
    takeLatest(actionTypes.GET_CURRENCIES_INIT, getCurrencies),
  ]);
}
