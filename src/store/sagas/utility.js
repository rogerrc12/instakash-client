import { call } from "redux-saga/effects";
import { logout } from "./auth";
import { openNotification } from "../../shared/antd";

export function* getUserId() {
  const userId = yield call([localStorage, "getItem"], "userId");

  if (!userId) {
    yield openNotification("error", "No estas autorizado para esta acción, por favor inicia sesión nuevamente.");
    return yield call(logout);
  }
  return +userId;
}
