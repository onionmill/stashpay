const NAP_DELAY = 5000;
const RETRY_DELAY = 1000;

export const UNITS = {
  sat: { display: 'sats', displayLong: 'Satoshi', denominator: 1 },
  bit: { display: 'bits', displayLong: 'Bits', denominator: 100 },
  btc: { display: 'BTC', displayLong: 'Bitcoin', denominator: 100000000 },
};
export const FIATS = {
  usd: { display: '$', displayLong: 'US Dollar (USD)' },
  eur: { display: '€', displayLong: 'Euro (EUR)' },
  jpy: { display: '¥', displayLong: 'Japanese Yen (JPY)' },
  gbp: { display: '£', displayLong: 'British Pound (GBP)' },
  aud: { display: 'A$', displayLong: 'Australian Dollar (AUD)' },
  cad: { display: 'C$', displayLong: 'Canadian Dollar (CAD)' },
  chf: { display: 'CHF', displayLong: 'Swiss Franc (CHF)' },
  cny: { display: '¥', displayLong: 'Chinese Yuan (CNY)' },
  hkd: { display: 'HK$', displayLong: 'Hong Kong Dollar (HKD)' },
  nzd: { display: 'NZ$', displayLong: 'New Zealand Dollar (NZD)' },
  sek: { display: 'kr', displayLong: 'Swedish Krona (SEK)' },
  krw: { display: '₩', displayLong: 'South Korean Won (KRW)' },
  sgd: { display: 'S$', displayLong: 'Singapore Dollar (SGD)' },
  nok: { display: 'kr', displayLong: 'Norwegian Krone (NOK)' },
  mxn: { display: 'MX$', displayLong: 'Mexican Peso (MXN)' },
  inr: { display: '₹', displayLong: 'Indian Rupee (INR)' },
  rub: { display: '₽', displayLong: 'Russian Ruble (RUB)' },
  zar: { display: 'R', displayLong: 'South African Rand (ZAR)' },
  try: { display: '₺', displayLong: 'Turkish Lira (TRY)' },
  brl: { display: 'R$', displayLong: 'Brazilian Real (BRL)' },
  twd: { display: 'NT$', displayLong: 'New Taiwan Dollar (TWD)' },
  dkk: { display: 'kr', displayLong: 'Danish Krone (DKK)' },
  pln: { display: 'zł', displayLong: 'Polish Złoty (PLN)' },
  thb: { display: '฿', displayLong: 'Thai Baht (THB)' },
  idr: { display: 'Rp', displayLong: 'Indonesian Rupiah (IDR)' },
  huf: { display: 'Ft', displayLong: 'Hungarian Forint (HUF)' },
  czk: { display: 'Kč', displayLong: 'Czech Koruna (CZK)' },
  ils: { display: '₪', displayLong: 'Israeli New Shekel (ILS)' },
  clp: { display: 'CLP$', displayLong: 'Chilean Peso (CLP)' },
  php: { display: '₱', displayLong: 'Philippine Peso (PHP)' },
  aed: { display: 'د.إ', displayLong: 'UAE Dirham (AED)' },
  cop: { display: 'COL$', displayLong: 'Colombian Peso (COP)' },
  sar: { display: 'ر.س', displayLong: 'Saudi Riyal (SAR)' },
  myr: { display: 'RM', displayLong: 'Malaysian Ringgit (MYR)' },
  ron: { display: 'lei', displayLong: 'Romanian Leu (RON)' },
  ars: { display: '$', displayLong: 'Argentine Peso (ARS)' },
  egp: { display: 'E£', displayLong: 'Egyptian Pound (EGP)' },
  vnd: { display: '₫', displayLong: 'Vietnamese Dong (VND)' },
  uah: { display: '₴', displayLong: 'Ukrainian Hryvnia (UAH)' },
};

export function nap(ms = NAP_DELAY) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * A polling utility that can be used to poll apis. If the api returns
 * a truthy value this utility will stop polling. Errors thrown by the
 * api are just thrown up to the caller to handle.
 * @param {Function} api     The api wrapped in an asynchronous function
 * @param {number} interval  The time interval to wait between polls
 * @param {number} retries   The number of retries to poll the api
 * @return {Promise<Object>} The return value of the api
 */
export const poll = async (api, interval = RETRY_DELAY, retries = Infinity) => {
  while (retries--) {
    const response = await api();
    if (response) {
      return response;
    }
    await nap(interval);
  }
  throw new Error('Maximum retries for polling reached');
};

/**
 * Format a number value in locale format with either . or ,
 * @param  {string|number} val The number value
 * @return {string}            The formatted number value
 */
export const formatNumber = val => {
  let num = Number(val);
  if (isNaN(num)) {
    num = 0;
  }
  const options = {maximumFractionDigits: 8};
  return new Intl.NumberFormat(undefined, options).format(num);
};

export const formatDate = timestamp => {
  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute:'numeric',
  };
  return new Date(timestamp * 1000).toLocaleString(undefined, options);
};

/**
 * Format a string from text input to a valid amount. Adds a leading 0 if the
 * string starts with a . or , and removes any second trailing . or ,
 * @param   {string} amount The amount as a string e.g. '0.01'
 * @returns {string}        The normalized amount
 */
export const normalizeAmount = (amount) => {
  return amount.replace(/^[,.]$/, '0$&').replace(/([,.].*)[,.]$/, '$1');
};

/**
 * Format a fiat currency value in local format with currency symbol and either . or ,
 * @param  {string|number} val The number value
 * @param  {string} currency   The fiat currency e.g. 'usd'
 * @return {string}            The formatte fiat currency value
 */
export const formatFiat = (val, currency) => {
  let num = Number(val);
  if (isNaN(num)) {
    num = 0;
  }
  const options = { style: 'currency', currency };
  const intl = new Intl.NumberFormat(undefined, options);
  const str = intl.format(num);
  if (num < 1 && num > 0 && /0[,.]0{2}/.test(str)) {
    return `< ${intl.format(0.01)}`;
  } else if (Math.abs(num) < 1 && Math.abs(num) > 0 && /0[,.]0{2}/.test(str)) {
    return `< ${intl.format(-0.01)}`;
  }
  return str;
};

/**
 * Parse a unix time stamp to a JavaScript date object
 * @param  {number} timeStamp The unix time stamp in seconds
 * @return {Date}             The date object
 */
export const parseDate = timeStamp => {
  if (!Number.isInteger(timeStamp)) {
    throw new Error('Invalid input!');
  }
  return new Date(timeStamp * 1000);
};

/**
 * Convert a string formatted btc/fiat amount to satoshis
 * @param  {string} amount   The amount e.g. '0.0001'
 * @param  {Object} settings Contains the current exchange rate
 * @return {number}          The satoshis as an integer
 */
export const toSatoshis = (amount, settings) => {
  if (
    typeof amount !== 'string' ||
    !/^[0-9]*[.,]?[0-9]*$/.test(amount) ||
    !settings ||
    typeof settings.displayFiat !== 'boolean'
  ) {
    throw new Error('Invalid input!');
  }
  amount = amount.replace(',', '.');
  if (settings.displayFiat) {
    const rate = settings.exchangeRate[settings.fiat] || 0;
    return Math.round(Number(amount) * rate * UNITS.btc.denominator);
  } else {
    return Math.round(Number(amount) * UNITS[settings.unit].denominator);
  }
};

/**
 * Convert satoshis to a BTC values than can set as a text input value
 * @param  {number} satoshis The value as a number
 * @param  {Object} settings Contains the current exchange rate
 * @return {string}          The amount formatted as '0.0001'
 */
export const toAmount = (satoshis, settings, fiatPrecision = 8) => {
  if (
    !Number.isInteger(satoshis) ||
    !settings ||
    typeof settings.displayFiat !== 'boolean'
  ) {
    throw new Error('Invalid input!');
  }
  if (satoshis === 0) {
    return '';
  }
  const num = settings.displayFiat
    ? calculateExchangeRate(satoshis, settings)
    : satoshis / UNITS[settings.unit].denominator;
  const options = {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: settings.displayFiat ? fiatPrecision : 8,
  };
  return new Intl.NumberFormat(undefined, options).format(num);
};

/**
 * Calculate the current fiat currency rate for a satoshi input
 * @param  {number} satoshis The BTC amount in satoshis
 * @param  {Object} settings Contains the current exchange rate
 * @return {string}          The locale formatted rate
 */
export const calculateExchangeRate = (satoshis, settings) => {
  if (
    !Number.isInteger(satoshis) ||
    typeof settings.displayFiat !== 'boolean'
  ) {
    throw new Error('Invalid input!');
  }
  const rate = settings.exchangeRate[settings.fiat] || 0;
  return satoshis / rate / UNITS.btc.denominator;
};

/**
 * Convert a satoshi value to fiat. The output should be used
 * throughout the UI for value labels.
 * @param  {number} satoshis The BTC amount in satoshis
 * @param  {Object} settings Contains the current exchange rate
 * @return {string}          The corresponding value label
 */
export const toFiatLabel = (satoshis, settings) => {
  return formatFiat(calculateExchangeRate(satoshis, settings), settings.fiat);
};

/**
 * Convert a satoshi value to a label with the sats unit.
 * @param  {number} satoshis The BTC amount in satoshis
 * @return {string}          The corresponding value label
 */
export const toSatLabel = satoshis => {
  return formatNumber(satoshis) + ' ' + UNITS.sat.display;
};

/**
 * Convert a satoshi value either to fiat or sat formatted label.
 * The output should be used throughout the UI for value labels.
 * @param  {number} satoshis The BTC amount in satoshis
 * @param  {Object} settings Contains the current exchange rate
 * @return {string}          The corresponding value label
 */
export const toFiatOrSatLabel = (satoshis, settings) => {
  return settings.displayFiat
    ? toFiatLabel(satoshis, settings)
    : toSatLabel(satoshis);
};
