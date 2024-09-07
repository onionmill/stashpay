const NAP_DELAY = 5000;

export function nap(ms = NAP_DELAY) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const formatNumber = val => {
  let num = Number(val);
  if (isNaN(num)) {
    num = 0;
  }
  const options = {maximumFractionDigits: 8};
  return new Intl.NumberFormat(undefined, options).format(num);
};

export const btcToSat = val => {
  return Math.round(Number(val) * 100000000);
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
