import { call, put } from "redux-saga/effects";
import * as activityActions from "../actions/activity";
import { logout } from "./auth";
import { openNotification } from "../../shared/antd";
import axios from "../../shared/axios";
import sweetalert from "sweetalert";

export function* getUserId() {
  const userId = yield call([localStorage, "getItem"], "userId");

  if (!userId) {
    yield openNotification("error", "No estas autorizado para esta acción, por favor inicia sesión nuevamente.");
    return yield call(logout);
  }
  return +userId;
}

export function* checkBalance({ payload }) {
  const { values, fn, checkType } = payload;

  const balanceValues = {
    Banco: values.idBank,
    NombreBanco: values.bankNameToReceive,
    Moneda: values.idCurrencyToReceive,
    Cantidad: values.receiving,
  };

  try {
    const res = yield axios.post("/cambiodivisa/ValidarFondos", JSON.stringify(balanceValues), {
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200 && res.data) {
      yield put(activityActions.checkBalance());
      if (checkType === "avance") {
        yield call(fn, 2);
      } else {
        yield call(fn);
      }
    } else {
      yield sweetalert(
        "Vaya!",
        `En estos momentos tenemos problemas con la plataforma ${values.bankNameToReceive}. Por favor intente más tarde o contacte a soporte al (929) 324 006.`,
        "error"
      );
      throw new Error(`Error con la paltaforma ${values.bankNameToReceive}`);
    }
  } catch (error) {
    if (checkType === "avance") {
      yield put(activityActions.checkBalanceFail());
    } else {
      throw error;
    }
  }
}
