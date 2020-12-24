import { takeLatest, all, put, call, delay } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import * as accountActions from "../actions/accounts";
import * as modalActions from "../actions/modal";
import * as utils from "./utility";
import axios from "../../shared/axios";
import { openNotification } from "../../shared/antd";
import swal from "sweetalert";

function* newAccountValues(values) {
  const userId = yield call(utils.getUserId);
  const newAccount = values;
  newAccount.idBankAccountType = +values.idBankAccountType;
  newAccount.idCurrencyType = +values.idCurrencyType;
  newAccount.idUser = +userId;

  if (values.isThird) {
    newAccount.idDocumentTypeThird = +values.idDocumentTypeThird;
  } else {
    newAccount.idDocumentTypeThird = null;
    newAccount.nameThird = null;
    newAccount.dniNumberThird = null;
  }

  return newAccount;
}

function* getAccounts() {
  let personalAccounts = [];
  let thirdAccounts = [];

  try {
    const res = yield axios.get(`/CuentaBanco/ObternerCuentaBancos`);

    if (res.data.length > 0) {
      personalAccounts = res.data
        .filter((acc) => !acc.isThird)
        .map((acc) => ({
          id: acc.idBankAccount,
          alias: acc.accountName,
          currency: acc.currencyType.symbol,
          idCurrency: acc.idCurrencyType,
          bank: acc.bank.name,
          idBank: acc.bank.idBank,
          number: acc.accountNumber,
          type: acc.bankAccountType.description,
          image: acc.bank.image,
        }));

      thirdAccounts = res.data
        .filter((acc) => acc.isThird)
        .map((acc) => ({
          id: acc.idBankAccount,
          alias: acc.accountName,
          currency: acc.currencyType.symbol,
          idCurrency: acc.idCurrencyType,
          bank: acc.bank.name,
          idBank: acc.bank.idBank,
          number: acc.accountNumber,
          type: acc.bankAccountType.description,
          image: acc.bank.image,
          thirdName: acc.nameThird,
          thirdDNINumber: acc.dniNumberThird,
        }));
    }

    yield put(accountActions.getAccounts(personalAccounts, thirdAccounts));
  } catch (error) {
    yield openNotification("error", "Ha ocurrido un error obteniendo tus cuentas, por favor intenta más tarde. Si el problema persiste contacta a soporte.");
  }
}

function* getAccountDetails(action) {
  const { id } = action;

  try {
    const res = yield axios.get(`CuentaBanco/ObtenerCuentaBanco?Id=${id}`);

    const accDetails = {
      id: res.data.idBankAccount,
      alias: res.data.accountName,
      currency: res.data.currencyType.symbol,
      idDocumentTypeThird: res.data.idDocumentTypeThird || "",
      nameThird: res.data.nameThird || "",
      dniNumberThird: res.data.dniNumberThird || "",
      idCurrency: res.data.idCurrencyType,
      idBank: res.data.bank.idBank,
      bank: res.data.bank.name,
      number: res.data.accountNumber,
      idType: res.data.idBankAccountType,
      type: res.data.bankAccountType.description,
      image: res.data.bank.image,
      isThird: res.data.isThird,
    };

    yield put(accountActions.getAccountDetails(accDetails));
  } catch (error) {
    yield openNotification("error", "Ha ocurrido un error obteniendo el detalle de tu cuenta. Por favor, contacta a soporte si el problema persiste.");
    yield put(accountActions.getAccountDetailsError());
    yield put(modalActions.closeModal());
  }
}

function* addAccount(action) {
  const accountValues = yield call(() => newAccountValues(action.values));

  const body = JSON.stringify(accountValues);

  try {
    const res = yield axios.post("/CuentaBanco/Guardar", body, { headers: { "Content-Type": "application/json" } });
    if (res.status === 200) {
      yield openNotification("success", "Cuenta agregada correctamente!");
      yield delay(500);
      yield put(modalActions.closeModal());
      yield put(accountActions.getAccountsInit());
      yield put(accountActions.addAccount());
    }
  } catch (error) {
    yield openNotification(
      "error",
      error.status === 404 ? "La cuenta que deseas agregar ya está registrada en este perfil." : "ha ocurrido un error al agregar la cuenta. Por favor, intenta más tarde."
    );
    yield put(modalActions.closeModal());
    yield put(accountActions.addAccountError());
  }
}

function* editAccount(action) {
  const { id, values } = action;
  const accountValues = yield call(newAccountValues, values);
  accountValues.idBankAccount = +id;

  const body = JSON.stringify(accountValues);

  try {
    const res = yield axios.post("/CuentaBanco/Editar", body, { headers: { "Content-Type": "application/json" } });

    if (res.status === 200) {
      yield openNotification("success", "Cuenta editada correctamente!");
      yield delay(1000);
      yield put(modalActions.closeModal());
      yield put(accountActions.getAccountsInit());
      yield put(accountActions.editAccount());
    }
  } catch (error) {
    console.log(error);
    yield put(accountActions.editAccountError());
    yield openNotification("error", "ha ocurrido un error al editar la cuenta. Por favor, intenta más tarde.");
  }
}

function* deleteAccount(action) {
  try {
    const swalResponse = yield swal({
      title: "¿Estás seguro?",
      content: "Si eliminas esta cuenta deberás agregarla nuevamente para usarla.",
      icon: "warning",
      buttons: true,
    });

    if (swalResponse) {
      const res = yield axios.post(`/CuentaBanco/Eliminar?Id=${action.id}`);

      if (res.status === 200) {
        yield openNotification("success", "Cuenta eliminada correctamente!");
        yield delay(1000);
        yield put(modalActions.closeModal());
        yield put(accountActions.getAccountsInit());
        yield put(accountActions.deleteAccount());
      } else {
        yield put(accountActions.deleteAccountError());
      }
    } else {
      yield put(accountActions.deleteAccountError());
    }
  } catch (error) {
    console.log(error);
    yield put(accountActions.deleteAccountError());
  }
  // const accounts = yield getAccountsState(action.accGroup);
  // const newAccounts = accounts.filter((account) => account.id !== action.id);
  // yield put(accountActions.deleteAccount(action.accType, newAccounts));
}

export default function* watchAccounts() {
  yield all([
    takeLatest(actionTypes.GET_ACCOUNTS_INIT, getAccounts),
    takeLatest(actionTypes.GET_ACCOUNT_DETAILS_INIT, getAccountDetails),
    takeLatest(actionTypes.ADD_ACCOUNT_INIT, addAccount),
    takeLatest(actionTypes.EDIT_ACCOUNT_INIT, editAccount),
    takeLatest(actionTypes.DELETE_ACCOUNT_INIT, deleteAccount),
  ]);
}
