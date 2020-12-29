import * as Yup from "yup";
import axios from "./axios";

export const validateSignIn = Yup.object().shape({
  Email: Yup.string().email("Debes colocar un correo válido."),
  Password: Yup.string()
    .required("Debes colocar una contraseña")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,}$/, "Formato de contraseña inválido."),
});

export const validatePhoneNumber = Yup.object().shape({
  PhoneNumber: Yup.string()
    .required("Coloca un teléfono de contacto.")
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]{7,}$/, "Debes colocar un teléfono válido."),
});

export const validateSignUp = Yup.object().shape({
  CompanyName: Yup.string().when("formType", {
    is: "company",
    then: Yup.string().required("Debes colocar el nombre de la empresa."),
  }),
  RUCNumber: Yup.string().when("formType", {
    is: "company",
    then: Yup.string()
      .required("Debes colocar el RUC.")
      .matches(/^[0-9]{8,14}$/, "Debes colocar un RUC válido."),
  }),
  Address: Yup.string().when("formType", {
    is: "company",
    then: Yup.string().required("Debes colocar la dirección fiscal"),
    otherwise: Yup.string().notRequired(),
  }),
  PhoneNumber: Yup.string()
    .required("Debes colocar un teléfono de contacto.")
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]{7,}$/, "Debes colocar un teléfono válido."),
  FirstName: Yup.string().required("Debes colocar un nombre."),
  LastName: Yup.string().required("Debes colocar un apellido."),
  Email: Yup.string().email("Debes colocar un correo válido.").required("Debes colocar un correo."),
  IdDocumentType: Yup.number().required("Debes seleccionar un documento."),
  DNINumber: Yup.string()
    .required("Debes colocar el número de documento.")
    .matches(/^[0-9]{5,15}$/, "Debes ingresar un documento válido."),
  PasswordHash: Yup.string()
    .required("Debes colocar una contraseña")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,}$/, "Debe ser de al menos 6 caracteres con 1 número."),
  ConfirmPassword: Yup.string()
    .required("Debes confirmar la contraseña")
    .when("PasswordHash", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("PasswordHash")], "Las contraseñas deben coincidir."),
    }),
  IdQuestion: Yup.number().required("Debes seleccionar una pregunta."),
  Answer: Yup.string().required("Debes colocar tu respuesta.").max(20, "Máximo 20 caracteres."),
  AccepTerms: Yup.boolean().oneOf([true], "Debes aceptar los términos y condiciones.").required(),
});

export const validateUpdateProfile = Yup.object().shape({
  DateBirth: Yup.string().required("Debe agregar su fecha de nacimiento."),
  Department: Yup.string().required("Debe seleccionar su departamento."),
  Province: Yup.string().required("Debe agregar su provincia"),
  District: Yup.string().required("Debe agregar su distrito"),
  Address: Yup.string().required("Debe agregar su dirección completa."),
  Occupation: Yup.string().required("Debe agregar su ocupación."),
  Profession: Yup.string().required("Debe agregar su profesión."),
});

export const validateAccountForm = Yup.object().shape({
  idBank: Yup.number().required("Debes seleccionar el banco."),
  accountNumber: Yup.string().required("Deber colocar el número de cuenta.").matches(/^\d+$/, "Solo se permiten números."),
  idBankAccountType: Yup.number().required("Debes seleccionar el tipo de cuenta."),
  idCurrencyType: Yup.number().required("Debes seleccionar la moneda."),
  accountName: Yup.string().required("Debes colocar un alias para la cuenta."),
  idDocumentTypeThird: Yup.number().when("isThird", {
    is: true,
    then: Yup.number().required("Debes seleccionar un tipo de documento."),
  }),
  dniNumberThird: Yup.string().when("isThird", {
    is: true,
    then: Yup.string().required("Debes colocar el número de documento."),
  }),
  nameThird: Yup.string().when("isThird", {
    is: true,
    then: Yup.string().required("Debes colocar el nombre del titular de la cuenta."),
  }),
});

export const validateEmail = Yup.object().shape({
  Email: Yup.string().test("checkEmail", "Este email no se encuentra registrado", async (value) => {
    if (!value) return true;
    try {
      const res = await axios.get(`/Usuario/EmailExitente?Correo=${value}`);

      return res.data;
    } catch (error) {
      return true;
    }
  }),
});

export const validatePasswordChange = Yup.object().shape({
  password: Yup.string()
    .required("Debes colocar una contraseña")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, "Debe ser de al menos 6 caracteres con 1 mayuscula y 1 número"),
  confirmPassword: Yup.string()
    .required("Debes confirmar la contraseña")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas deben coincidir."),
    }),
});

export const validateCurrencyExchange = Yup.object().shape({
  sending: Yup.number().required("Debes colocar un monto a enviar"),
  accountToReceive: Yup.string().required("Debes seleccionar una de tus cuentas."),
  bankToSend: Yup.string().required("Debes seleccionar un banco."),
  originFunds: Yup.string().when(["sending", "idCurrencyToSend"], {
    is: (sending, idCurrencyToSend) => (sending > 9999 && idCurrencyToSend === 1) || (sending > 29999 && idCurrencyToSend === 2),
    then: Yup.string().required("Debes declarar el origen de tus fondos."),
    otherwise: Yup.string().notRequired(),
  }),
  destinationFunds: Yup.string().when(["sending", "idCurrencyToSend"], {
    is: (sending, idCurrencyToSend) => (sending > 9999 && idCurrencyToSend === 1) || (sending > 29999 && idCurrencyToSend === 2),
    then: Yup.string().required("Debes declarar el destino de tus fondos."),
    otherwise: Yup.string().notRequired(),
  }),
  acceptFunds: Yup.boolean().when(["sending", "idCurrencyToSend"], {
    is: (sending, idCurrencyToSend) => (sending > 9999 && idCurrencyToSend === 1) || (sending > 29999 && idCurrencyToSend === 2),
    then: Yup.boolean().oneOf([true], "Debes aceptar para continuar.").required(),
    otherwise: Yup.boolean().notRequired(),
  }),
});

export const validateCashAdvance = (limit) =>
  Yup.object().shape({
    amountToPay: Yup.number().min(100, "El monto mínimo permitido es de 100 soles.").max(limit, `El monto máximo permitido es de ${limit} soles.`),
    IdPayingBank: Yup.number().required("Debes seleccionar una forma de pago"),
    accountToReceive: Yup.string().required("Debes seleccionar una de tus cuentas."),
    accept: Yup.boolean().oneOf([true], "Debes aceptar para continuar.").required(),
  });

export const validateTransferNumber = Yup.object().shape({
  transferNumber: Yup.string()
    .required("Debes ingresar el número de transferencia.")
    .matches(/^[0-9]{6,}$/, "Coloca un número de transferencia válido"),
});

export const validateDNINumber = async (value, documentType) => {
  if (!value && !documentType) return "";
  try {
    const res = await axios.get(`/Usuario/DocumentoExitente?Documento=${value}{&TipoDocumento=${documentType}`);
    if (res.data) {
      return "Este tipo y número de documento ya se encuentran registrados.";
    }
  } catch (error) {
    return "";
  }
};

export const validateEmailExistance = async (value) => {
  if (!value) return "";
  try {
    const res = await axios.get(`/Usuario/EmailExitente?Correo=${value}`);
    if (res.data) {
      return "Este correo se encuentra registrado";
    }
  } catch (error) {
    return "";
  }
};
