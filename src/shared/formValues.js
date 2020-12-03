export const signUpValues = (values, formType) => ({
  CompanyName: "",
  RUCNumber: "",
  FirstName: values && values.firstName ? values.firstName : "",
  LastName: values && values.lastName ? values.lastName : "",
  Email: values && values.email ? values.email : "",
  Address: "",
  PhoneNumber: "",
  IdDocumentType: "",
  DNINumber: "",
  PasswordHash: "",
  ConfirmPassword: "",
  IdQuestion: "",
  Answer: "",
  urlImagen: values && values.urlImagen ? values.urlImagen : null,
  AccepTerms: false,
  ReceiveInformation: true,
  formType,
});

export const signInValues = { Email: "", Password: "", clientDateTime: new Date().toISOString() };

export const profileValues = {
  DateBirth: "",
  Department: "",
  Province: "",
  District: "",
  Address: "",
  Occupation: "",
  Profession: "",
};

export const accountValues = (values, isThird) => ({
  idBank: values.idBank || "",
  accountNumber: values.number || "",
  idDocumentTypeThird: values.idDocumentTypeThird || "",
  nameThird: values.nameThird || "",
  dniNumberThird: values.dniNumberThird || "",
  idBankAccountType: values.idType || "",
  idCurrencyType: values.idCurrency || "",
  accountName: values.alias || "",
  balance: 0,
  active: true,
  isThird,
});

export const currencyExchangeValues = (buying, currencyReceive, currencySend, exchangeRateId) => ({
  sending: 1000,
  receiving: 1000 * buying,
  idCurrencyToReceive: currencyReceive,
  idCurrencyToSend: currencySend,
  idExchangeRate: exchangeRateId,
  condition: "buying",
  bankToReceive: "",
  bankNameToReceive: "",
  accountToReceive: "",
  bankToSend: "",
  rate: buying,
  acceptFunds: false,
  originFunds: "",
  destinationFunds: "",
});

export const cashAdvanceValues = {
  amountToPay: 0,
  amountToReceive: 0,
  accept: false,
  idCurrencyToReceive: 2,
  IdPayingBank: "",
  bankToReceive: "",
  bankNameToReceive: "",
  accountToReceive: "",
};
