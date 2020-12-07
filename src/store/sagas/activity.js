import { takeLatest, all, put, select, call } from "redux-saga/effects";
import * as actions from "../actions/activity";
import * as actionTypes from "../actionTypes";
import * as utilities from "./utility";
import axios from "../../shared/axios";
import { openNotification } from "../../shared/antd";
import moment from "moment";

export function* getActivity() {
  const userId = yield call(utilities.getUserId);
  let currencyExchanges = [];
  let cashAdvances = [];

  try {
    const res = yield axios.get(`/Actividad/Actividades?IdUsuario=${userId}`);

    const { cambiosDeDivisas, avancesDeEfectivo } = res.data;

    if (cambiosDeDivisas.length > 0) {
      currencyExchanges = cambiosDeDivisas.map((cambio) => ({
        id: cambio.idPayment,
        statusId: cambio.transactionState.idTransactionState,
        status: cambio.transactionState.description.toLowerCase(),
        statusColor: cambio.transactionState.hexaColor.toLowerCase(),
        orderId: cambio.pedidoId,
        date: moment(cambio.paymentDate).format("DD/MM/YYYY hh:mm a"),
        amountToSend: `${cambio.exchangeType.currencyType.symbol} ${cambio.amountSell.toFixed(2)}`,
        amount: `${cambio.exchangeTo.currencyType.symbol} ${cambio.amountReceive.toFixed(2)}`,
        bankToDeposit: cambio.bank.name,
        bankImg: cambio.bank.image,
        bankAccount: cambio.accountNumber,
        instaBankName: cambio.instaAccount.bank ? cambio.instaAccount.bank.name : "no tiene nombre",
        instaBankImage: cambio.instaAccount.bank ? cambio.instaAccount.bank.image : "No tiene imagen",
        instaAccount: cambio.instaAccount.direct,
        rate: cambio.exchangeType.idExchangeType === 1 ? "S/. " + cambio.historicalTransaccion.totalBuy : "S/. " + cambio.historicalTransaccion.totalSale,
      }));
    }

    if (avancesDeEfectivo.length > 0) {
      cashAdvances = avancesDeEfectivo.map((avance) => ({
        id: avance.id,
        statusId: avance.transactionState.idTransactionState,
        status: avance.transactionState.description,
        statusColor: avance.transactionState.hexaColor,
        orderId: avance.pedidoId,
        date: moment(avance.paymentDate).format("DD/MM/YYYY hh:mm a"),
        amountToPay: "S/. " + avance.amountSell,
        amountToReceive: "S/. " + avance.amountReceive,
        bankToDeposit: avance.bankAccount.name,
        bankImg: avance.bankAccount.image,
        bankAccount: avance.accountNumber,
        paymentOption: avance.payingBank.name,
        paymentLink: avance.paymentLink,
      }));
    }

    yield put(actions.getActivity(currencyExchanges, cashAdvances));
  } catch (error) {
    yield openNotification("error", error.message ? error.message : error);
    yield put(actions.getActivityError());
  }
}

function* getExchangeDetails(action) {
  const data = yield select((state) => state.activity.currencyExchanges.find((exchange) => exchange.id === action.id));

  yield put(actions.getExchangeDetails(data));
}

function* getAdvanceDetails(action) {
  const data = yield select((state) => state.activity.cashAdvances.find((advance) => advance.id === action.id));

  yield put(actions.getAdvanceDetails(data));
}

export default function* watchActivity() {
  yield all([
    takeLatest(actionTypes.GET_ACTIVITY_INIT, getActivity),
    takeLatest(actionTypes.GET_EXCHANGE_DETAILS_INIT, getExchangeDetails),
    takeLatest(actionTypes.GET_ADVANCE_DETAILS_INIT, getAdvanceDetails),
  ]);
}
