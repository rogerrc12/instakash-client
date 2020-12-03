import { takeLatest, put, all, call } from "redux-saga/effects";
import { openNotification } from "../../shared/antd";
import axios from "../../shared/axios";
import * as actionTypes from "../actionTypes";
import * as modalActions from "../actions/modal";
import * as activityActions from "../actions/activity";
import * as advanceActions from "../actions/cashAdvance";
import * as utilSagas from "./utility";
import sweetalert from "sweetalert";
import history from "../../shared/history";

function* getLimits() {
  try {
    const res = yield axios.get("/AvanceEfectivo/ObtenerLimite");
    const limits = {
      soles: res.data.find((limite) => limite.idCurrencyType === 2).limit,
      dolares: res.data.find((limite) => limite.idCurrencyType === 1).limit,
    };

    yield put(advanceActions.getLimits(res.data.tarifa, limits));
  } catch (error) {
    console.log(error);
    yield put(advanceActions.getLimitsFail());
  }
}

function* createAdvance(action) {
  const userId = yield call(utilSagas.getUserId);

  const newAdvance = {
    IdBankAccount: action.values.bankToReceive,
    IdPayingBank: action.values.IdPayingBank,
    amountSell: action.values.amountToPay,
    amountReceive: action.values.amountToReceive,
    IdUser: userId,
    IdCurrencyType: action.values.idCurrencyToReceive,
  };

  try {
    const res = yield axios.post("/AvanceEfectivo/CrearAvanceEfectivo", newAdvance, {
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      const { idAvanceEfectivo, link } = res.data;

      yield put(advanceActions.createAdvance(idAvanceEfectivo, link));
      yield action.goStep(4);
    }
  } catch (error) {
    console.log(error);
    yield openNotification("error", "Ha ocurrido un error al registrar la solicitud de pago. Por favor, contacta con soporte.");
    yield put(advanceActions.createAdvanceFail());
  }
}

function* processAdvance(action) {
  try {
    const res = yield axios.post(`/AvanceEfectivo/ValidarAvanceEfectivo?IdActividad=${action.id}&NumOperacion=${action.number}`);

    if (res.status === 200) {
      if (action.goStep) {
        yield call(() => action.goStep(0));
        yield history.push("/actividad");
      } else {
        yield put(modalActions.closeModal());
      }

      yield sweetalert({
        title: "Exitoso!",
        text: "Su solicutd de avance de efectivo ha sido recibida y será procesada en breve. Puede ver su correo para mayor información.",
        icon: "success",
      });

      yield put(activityActions.getActivityInit());

      yield put(advanceActions.processAdvance());
    }
  } catch (error) {
    console.log(error);
    yield openNotification("error", "Ha ocurrido un error al procesar su nro. de operación. Por favor contacte a soporte.");
    yield put(advanceActions.processAdvanceFailed());
  }
}

function* cancelAdvance(action) {
  const { id } = action;

  try {
    const result = yield sweetalert({
      title: "¿Estás seguro?",
      text: "Deberás registrar una nueva solicitud.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (result) {
      const res = yield axios.post(`/AvanceEfectivo/CancelarAvanceEfectivo?IdActividad=${id}`);

      if (res.status === 200) {
        if (action.goStep) {
          yield call(() => action.goStep(0));
          yield history.push("/actividad");
        } else {
          yield put(modalActions.closeModal());
        }

        yield sweetalert({
          title: "Cancelado!",
          text: "Su solicitud de avance de efectivo ha sido cancelado correctamente.",
          icon: "success",
        });

        yield put(activityActions.getActivityInit());

        yield put(advanceActions.cancelAdvance());
      }
    } else {
      yield put(advanceActions.cancelAdvanceFail());
    }
  } catch (error) {
    console.log(error);
    yield openNotification("error", "Ha ocurrido un error al cancelar su solicitud. Por favor contacte a soporte.");
    yield put(advanceActions.cancelAdvanceFail());
  }
}

function* validateUserLimit(action) {
  const userId = yield call(utilSagas.getUserId);
  const { values } = action;

  try {
    const res = yield axios.get(`/AvanceEfectivo/ValidarLimite?IdMoneda=${values.IdMoneda}&Monto=${values.Monto}&IdUsuario=${userId}`);

    if (res.status === 200) action.goNext(1);
    yield put(advanceActions.validateLimit());
  } catch (error) {
    if (error.status === 409) {
      yield openNotification("error", "Haz alcanzado el limite diario para solicitar avances de efectivo. Por favor intenta mañana.");
    } else {
      yield openNotification("error", "Ha ocurrido un error con su solicitud de avance de efectivo, por favor intenta más tarde.");
    }

    yield put(advanceActions.validateLimitFail());
  }
}

export default function* watchCashAdvance() {
  yield all([
    takeLatest(actionTypes.GET_ADVANCE_LIMITS_INIT, getLimits),
    takeLatest(actionTypes.CREATE_ADVANCE_INIT, createAdvance),
    takeLatest(actionTypes.PROCESS_ADVANCE_INIT, processAdvance),
    takeLatest(actionTypes.CANCEL_ADVANCE_INIT, cancelAdvance),
    takeLatest(actionTypes.VALIDATE_USER_LIMIT_INIT, validateUserLimit),
  ]);
}
