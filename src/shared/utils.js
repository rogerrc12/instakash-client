import InterbankIcon from "../assets/images/banks/interbank-icon.svg";
import bcpIcon from "../assets/images/banks/bcp-icon.svg";

export const formatPrice = (amount) =>
  +amount.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 });

export const banksList = (banks) =>
  banks.length > 0
    ? banks.map((bank) => ({
        value: bank.idBank,
        label: bank.name,
        image: bank.image,
      }))
    : [
        { value: 20, label: "Interbank", icon: InterbankIcon },
        { value: 1, label: "Banco Nacional de Crédito", icon: bcpIcon },
      ];
