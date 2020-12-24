import { takeLatest, put, all, call, delay } from "redux-saga/effects";
import history from "../../shared/history";
import * as actionTypes from "../actionTypes";
import * as actions from "../actions/auth";
import * as registrationActions from "../actions/registration";
import * as modalActions from "../actions/modal";
import axios from "../../shared/axios";
import swal from "sweetalert";
import { getUserId } from "./utility";
import { openNotification } from "../../shared/antd";

function onAuthStateChanged(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/Usuario/ObtenerUsuario?Id=${id}`)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
  });
}

function* onLoginUser(data) {
  const { token, idUser, expires } = data;
  const expTime = yield new Date(expires);

  const userObj = { accessToken: token, userId: idUser, tokenExp: expTime };
  yield call([localStorage, "setItem"], "authUser", JSON.stringify(userObj));
  yield put(actions.loginUser(token));
  yield call(loadUser);
}

function* checkAuthTimeout(action) {
  yield delay(action.expTime);
  yield call(logout);
}

function* loadUser() {
  const authUser = yield call([localStorage, "getItem"], "authUser");

  if (authUser) {
    const { userId, accessToken, tokenExp } = JSON.parse(authUser);
    const expTime = new Date(tokenExp);

    if (accessToken) {
      if (expTime <= new Date()) return yield call(logout);

      try {
        const userData = yield call(onAuthStateChanged, userId);

        const user = {
          name: userData.firstName + " " + userData.lastName,
          email: userData.email,
          clientId: userData.id,
          photoURL: userData.urlImagen || null,
          phoneNumber: userData.phoneNumber,
          companyName: userData.companyName,
          rucNumber: userData.rucNumber,
          birthday: userData.dateBirth,
          address: userData.address ? `${userData.address} ${userData.deparment ? userData.deparment : ""}` : null,
        };

        yield put(actions.loadUser(user));
        yield put(actions.checkAuthTimeout(expTime.getTime() - new Date().getTime()));
      } catch (error) {
        yield put(actions.loadUserFail());
      }
    } else yield put(actions.loadUserFail());
  } else yield put(actions.loadUserFail());
}

function* registerUser(action) {
  const userData = {
    FirstName: action.values.FirstName,
    LastName: action.values.LastName,
    Email: action.values.Email,
    PasswordHash: action.values.PasswordHash,
    PhoneNumber: action.values.PhoneNumber,
    IdDocumentType: +action.values.IdDocumentType,
    DNINumber: action.values.DNINumber,
    AccepTerms: action.values.AccepTerms,
    Address: action.values.Address || null,
    ReceiveInformation: true,
    urlImagen: action.values.urlImagen,
    CompanyName: action.values.CompanyName || null,
    RUCNumber: action.values.RUCNumber || null,
    IdQuestion: +action.values.IdQuestion,
    Answer: action.values.Answer,
  };

  try {
    const body = JSON.stringify(userData);
    const res = yield axios.post("/Usuario/Registro", body, { headers: { "Content-type": "application/json" } });
    if (res.status === 200) {
      const { token, idUser } = res.data;
      const expTime = yield new Date(new Date().getTime() + 3600 * 1000);
      yield call([localStorage, "setItem"], "idToken", token);
      yield call([localStorage, "setItem"], "userId", idUser);
      yield call([localStorage, "setItem"], "expTime", expTime);
      yield put(actions.registerUser(token));
      yield call(loadUser);
    }
  } catch (error) {
    let message = "Ha ocurrido un error durante el registro. Por favor intenta nuevamente. Si el problema persiste contacta a soporte.";

    if (error.status === 404) {
      const documentMessage = userData.RUCNumber ? "Al parecer el RUC no existe o no es válido con la razón social." : "Al parecer el DNI no es válido o no existe.";
      message = `${documentMessage} Por favor, verifique los datos e intente de nuevo.`;
    }

    yield openNotification("error", message);

    yield put(actions.registerUserFail());
  }
}

function* loginGoogle(action) {
  const { token } = action;

  const tokenBlob = new Blob([JSON.stringify({ tokenId: token }, null, 2)], { type: "application/json" });
  try {
    const res = yield axios.post("/Usuario/Google", tokenBlob, { headers: { "Content-type": "application/json" } });

    if (!res.data.idUser) {
      const names = res.data.name.split(" ");
      const firstName = names[0];
      const lastName = names[1];
      const email = res.data.email;
      const urlImagen = res.data.picture;

      yield put(actions.setGoogleRegistration({ firstName, lastName, email, urlImagen }));
      yield put(actions.setAuthComponent("register"));
    } else {
      yield call(() => onLoginUser(res.data));
    }
  } catch (error) {
    yield openNotification("error", "Ha ocurrido un error iniciando sesión desde google. Por favor, intenta más tarde el servicio de google.");
    yield put(actions.loginUserFail());
  }
}

function* loginUser(action) {
  const body = JSON.stringify(action.values);

  try {
    const res = yield axios.post("/Usuario/Login", body, { headers: { "Content-type": "application/json" } });

    yield call(onLoginUser, res.data);
  } catch (error) {
    yield openNotification(
      "error",
      error.status === 404
        ? "Correo y/o contraseña incorrectos. Por favor verifica los datos."
        : error.status === 409
        ? "Al parecer no estás habilitado para iniciar sesión. Por favor contacta a soporte."
        : "Ha ocurrido un error iniciando sesión, por favor, intentalo más tarde."
    );
    yield put(actions.loginUserFail());
  }
}

export function* logout() {
  try {
    yield axios.get(`/Usuario/Logout`);
  } catch (error) {
    console.log(error);
  }

  yield put(actions.logout());
  yield history.push("/login");
  yield call([localStorage, "removeItem"], "authUser");

  yield put(registrationActions.getBanksInit());
  yield put(registrationActions.getDocumentsInit());
  yield put(registrationActions.getCurrenciesInit());
  yield put(registrationActions.getQuestionsInit());
}

function* SendPasswordEmail(action) {
  const { email } = action;

  try {
    yield axios.post(`/Usuario/SolicitadCambioPass?Correo=${email}`);
    swal("Mensaje enviado!", "Recuerda revisar tu carpeta de spam.", "success");
    yield put(actions.sendPasswordEmail());
  } catch (error) {
    yield openNotification("error", "Ha ocurrido un error al enviar el correo. Por favor, intenta nuevamente. Si el problema persiste contacta a soporte.");
    yield put(actions.sendPasswordEmailFail());
  }
}

function* validatePasswordChange(action) {
  const { token } = action;

  try {
    const res = yield axios.get(`/Usuario/ValidarCambioContra?Token=${token}`);
    if (!res.data) {
      yield openNotification("error", "El link para cambiar tu contraseña ha expirado o no es válido. Debes solicitar uno nuevo.");
      return history.push("/login");
    }
  } catch (error) {
    yield openNotification("error", "Ha ocurrido un error con el link de cambio de contraseña, por favor, intenta de nuevo.");
    return history.push("/login");
  }
}

function* changePassword(action) {
  let { password, userId } = action;

  if (!userId) userId = yield call(getUserId);

  try {
    yield axios.post(`/Usuario/CambiarPass?id=${userId}&Pass=${password}`, {
      headers: { "Content-Type": "application/json" },
    });
    yield put(actions.changePassword());
    swal("Exitoso!", "Contraseña cambiada correctamente.", "success");
    yield delay(2000);
    return history.push("/login");
  } catch (error) {
    yield put(actions.changePasswordFail());
    yield openNotification("error", "Ha ocurrido un error al cambiar tu contraseña. Por favor intenta nuevamente, si el problema persiste contacta a soporte.");
  }
}

function* changePhoneNumber(action) {
  const userId = yield call(getUserId);

  try {
    const res = yield axios.post(`Usuario/ActualizarTelefono?IdUsuario=${userId}&Telefono=${action.phoneNumber}`);

    if (res.status === 200) {
      yield openNotification("success", "Número agregado correctamente!. Ya puedes realizar tus operaciones.");
      yield put(actions.changePhoneNumber());
      yield call(loadUser);
    }
  } catch (error) {
    console.log(error);
    yield openNotification("error", "Ha ocurrido un error actualizando el número de teléfono. Por favor intenta de nuevo, si el problema persiste contacta a soporte.");
    yield put(actions.changePhoneNumberFail());
  }
}

function* changeAddress(action) {
  const userId = yield call(getUserId);

  try {
    const res = yield axios.post(`/Usuario/ActualizarDireccion?Id=${userId}&Direccion=${action.address}`);

    if (res.status === 200) {
      yield openNotification("success", "Dirección agregada correctamente!. Ya puedes realizar tus operaciones.");
      yield put(actions.changeAddress());
      yield call(loadUser);
    }
  } catch (error) {
    console.log(error);
    yield openNotification("error", "Ha ocurrido un error actualizando la dirección. Por favor intenta de nuevo, si el problema persiste contacta a soporte.");
    yield put(actions.changeAddressFail());
  }
}

function* updateProfile(action) {
  const userId = yield call(getUserId);

  const body = JSON.stringify({
    Id: +userId,
    DateBirth: new Date(action.values.DateBirth),
    Address: action.values.Address + ", " + action.values.District + ", " + action.values.Province,
    Deparment: action.values.Deparment,
    Occupation: action.values.Occupation,
    Profession: action.values.Profession,
  });

  try {
    const res = yield axios.post("/Usuario/ActualizarPerfil", body, { headers: { "Content-Type": "application/json" } });

    if (res.status === 200) {
      yield call(loadUser);

      yield openNotification("success", "Perfil actualizado correctamente. Puede continuar con su operación.");
      yield put(modalActions.closeModal());
      yield put(actions.updateProfile());
    }
  } catch (error) {
    console.log(error);
    yield openNotification("error", "Ha ocurrido un error inesperado actualizando tu perfil. Por favor contacta a soporte.");
    yield put(actions.updateProfileFail());
  }
}

export default function* watchAuth() {
  yield all([
    takeLatest(actionTypes.GET_USER_INIT, loadUser),
    takeLatest(actionTypes.REGISTER_INIT, registerUser),
    takeLatest(actionTypes.LOGIN_INIT, loginUser),
    takeLatest(actionTypes.LOGIN_GOOGLE_INIT, loginGoogle),
    takeLatest(actionTypes.LOGOUT_INIT, logout),
    takeLatest(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeout),
    takeLatest(actionTypes.SENT_PASSWORD_EMAIL_INIT, SendPasswordEmail),
    takeLatest(actionTypes.VALIDATE_PASSWORD_CHANGE_INIT, validatePasswordChange),
    takeLatest(actionTypes.CHANGE_PASSWORD_INIT, changePassword),
    takeLatest(actionTypes.CHANGE_PHONE_INIT, changePhoneNumber),
    takeLatest(actionTypes.CHANGE_ADDRESS_INIT, changeAddress),
    takeLatest(actionTypes.UPDATE_PROFILE_INIT, updateProfile),
  ]);
}
