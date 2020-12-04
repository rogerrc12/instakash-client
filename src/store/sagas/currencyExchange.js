import { takeLatest, put, all, call } from "redux-saga/effects";
import { openNotification } from "../../shared/antd";
import * as actions from "../actions/currencyExchange";
import * as modalActions from "../actions/modal";
import * as activityActions from "../actions/activity";
import * as utilSagas from "./utility";
import * as actionTypes from "../actionTypes";
import axios from "../../shared/axios";
import sweetalert from "sweetalert";
import history from "../../shared/history";

function* getPrices() {
  try {
    const res = yield axios.get("/cambiodivisa/conversion");
    const prices = { buying: Number(res.data.compra), selling: Number(res.data.venta) };
    const limits = { soles: +res.data.limite[0].limite, dolares: +res.data.limite[1].limite };
    const exchangeId = res.data.idHistoricalTransaccion;

    yield put(actions.getPrices(prices, limits, exchangeId));
  } catch (error) {
    yield call(() =>
      openNotification("error", "Ha ocurrido un error obteniendo las tasas de compra/venta. Por faovr, intenta más tarde. Si el problema persiste contacta a soporte.")
    );
    yield put(actions.getPricesError());
  }
}

function* createExchange(action) {
  const userId = yield call(utilSagas.getUserId);

  const { sending, receiving } = action.values;

  const newExchange = {
    IdBankAccount: action.values.bankToReceive,
    amountSell: sending,
    amountReceive: receiving,
    UserId: userId,
    PaymentDate: new Date(),
    IdExchangeType: action.values.idCurrencyToSend,
    IdExchangeTo: action.values.idCurrencyToReceive,
    NumberBankReference: null,
    IdBank: action.values.idBank,
    IdInstaAccount: action.values.bankToSend,
    OriginFunds: action.values.originFunds.length > 0 ? action.values.originFunds : null,
    DestinationFunds: action.values.destinationFunds.length > 0 ? action.values.destinationFunds : null,
    IdHistoricalTransaccion: action.values.idExchangeRate,
  };

  try {
    const res = yield axios.post("/cambiodivisa/CrearNuevo", newExchange, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      yield put(actions.createExchange(res.data));
      yield call([action, "goStep"], 3);
    }
  } catch (error) {
    let message = "Ha ocurrido un error creando su solicitud, por favor intente de nuevo. Si el problema persiste contacte a soporte.";
    if (error.status === 409) message = `Parece que tenemos problemas con el banco ${action.values.bankNameToReceive}. Si el problema persiste contacte a soporte.`;
    yield openNotification("error", message);
    yield put(actions.createExchangeError());
  }
}

function* validateExchange(action) {
  try {
    yield call([utilSagas, "checkBalance"], { payload: { values: action.values, fn: () => createExchange(action), checkType: "currency-exchange" } });
  } catch (error) {
    yield put(actions.createExchangeError());
  }
}

function* processExchange(action) {
  const { id, transferNumber } = action;

  try {
    const res = yield axios.post(`/cambiodivisa/ProcesarActividad?Id=${id}&NumeroRef=${transferNumber}`);

    if (res.status === 200) {
      if (action.goStep) {
        yield call(() => action.goStep(0));
        yield history.push("/actividad");
      } else {
        yield put(modalActions.closeModal());
      }

      yield sweetalert({
        title: "Exitoso!",
        text: "Su solicitud de cambio ha sido recibida y será atendida en breve. Puede revisar su correo para más información.",
        icon: "success",
      });

      yield put(activityActions.getActivityInit());

      yield put(actions.processExchange());
    }
  } catch (error) {
    if (error.status === 409) {
      yield openNotification("error", "Parece que ya ha registrado ese mismo número de transferencia por hoy. Si cree que esto es un error por favor contacte a soporte.");
    } else if (error.status === 404) {
      yield openNotification("error", "Se ha agotado el tiempo para procesar esta transacción. Debes generar otra para solicitar tu cambio.");
    } else {
      yield openNotification("error", "Ha ocurrido un error agregando el nro. de transferencia. Por favor contacta a soporte si el problema persiste.");
    }

    yield put(actions.processExchangeError());
  }
}

function* cancelExchange(action) {
  const { id } = action;

  try {
    const result = yield sweetalert({
      title: "¿Estás seguro?",
      text: "Deberás registrar una nueva solicitud si deseas hacer tu cambio.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (result) {
      const res = yield axios.post(`cambiodivisa/CancelarActividad?Id=${id}`);

      if (res.status === 200) {
        yield history.push("/actividad");

        yield openNotification("success", "Solicitud cancelada correctamente.");

        yield put(actions.cancelExchange());
      }
    } else {
      yield put(actions.cancelExchangeError());
    }
  } catch (error) {
    console.log(error);
    yield openNotification("error", "Ha ocurrido un error al cancelar tu solicitud. Por favor contacta a soporte.");
    yield put(actions.cancelExchangeError());
  }
}

export default function* watchCurrencyExchange() {
  yield all([
    takeLatest(actionTypes.GET_EXCHANGE_PRICES_INIT, getPrices),
    takeLatest(actionTypes.CREATE_EXCHANGE_INIT, validateExchange),
    takeLatest(actionTypes.PROCESS_EXCHANGE_INIT, processExchange),
    takeLatest(actionTypes.CANCEL_EXCHANGE_INIT, cancelExchange),
    takeLatest(actionTypes.CHECK_BALANCE_INIT, utilSagas.checkBalance),
  ]);
}
