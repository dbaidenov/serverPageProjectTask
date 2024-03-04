// интернационализация валюты

export function currencyFormat(value: number, userCurrency: string) {
  return new Intl.NumberFormat(navigator.language, {
    currency: userCurrency,
    style: "currency",
  }).format(value);
}
