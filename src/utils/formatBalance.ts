export function formatBalance(num: number) {
  if (!num) return "";
  let [integerPart, decimalPart] = num.toFixed(2).split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${formattedInteger}.${decimalPart}`;
}
