const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "د.إ",
};

export const getCurrencySymbol = (currencyCode: string): string => {
  return currencySymbols[currencyCode] || currencyCode;
};
