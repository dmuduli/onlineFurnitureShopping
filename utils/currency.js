const digitsRE = /(\d{3})(?=\d)/g;
const shopifyPriceInCents = 100;

export function currency(value, isPriceInCents) {
  if (isPriceInCents) {
    value = value / shopifyPriceInCents;
    return convertToCurrency(value);
  }

  return convertToCurrency(value);
}

export function formatCurrency(price, decimalPlace) {
  if (price && decimalPlace) {
    return `$${new Intl.NumberFormat("en", {
      minimumFractionDigits: decimalPlace,
      maximumFractionDigits: decimalPlace,
    }).format(price)}`;
  }
  if (price) {
    return `$${new Intl.NumberFormat().format(price)}`;
  }
  return "";
}

function convertToCurrency(value, currency, decimals) {
  value = parseFloat(value);

  if (!isFinite(value) || (!value && value !== 0)) return "";

  currency = currency != null ? currency : "$";
  decimals = decimals != null ? decimals : 2;

  let stringified = Math.abs(value).toFixed(decimals);

  const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  const i = _int.length % 3;
  const head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "";
  const _float = decimals ? stringified.slice(-1 - decimals) : "";
  const sign = value < 0 ? "-" : "";
  return (
    sign + currency + head + _int.slice(i).replace(digitsRE, "$1,") + _float
  );
}
