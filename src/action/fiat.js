import {action} from 'mobx';

import store from '../store';
import {poll} from '../util';
import * as log from './log';
import * as storage from './local-storage';

const FIAT_KEY = 'fiat';
const RATES_KEY = 'rates';
const POLL_DELAY = 15 * 60 * 1000;

export const init = action(async () => {
  try {
    await _loadSelected();
    await _loadRates();
  } catch (err) {
    alert.error({err});
  }
  _pollRates();
});

const _loadSelected = async () => {
  const savedFiat = await storage.getItem(FIAT_KEY);
  if (!savedFiat) {
    return;
  }
  store.settings.fiat = savedFiat;
  log.trace(`Loaded selected fiat: ${savedFiat}`);
};

const _loadRates = async () => {
  const {fiat, exchangeRate} = store.settings;
  const rates = await storage.getItem(RATES_KEY);
  if (!rates) {
    return;
  }
  exchangeRate[fiat] = Number(rates.BTC);
  log.trace(`Cached rates: ${JSON.stringify(exchangeRate)}`);
};

const _fetchRates = action(async () => {
  try {
    const {fiat, exchangeRate} = store.settings;
    const url = 'https://api.coinbase.com/v2/exchange-rates?';
    const query = new URLSearchParams({currency: fiat});
    const response = await fetch(url + query.toString());
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const {rates} = (await response.json()).data;
    exchangeRate[fiat] = Number(rates.BTC);
    await storage.setItem(RATES_KEY, rates);
    log.trace(`Storing rates: ${JSON.stringify(exchangeRate)}`);
  } catch (err) {
    alert.error({message: 'Error fetching fiat rate', err});
  }
});

async function _pollRates() {
  await poll(() => _fetchRates(), POLL_DELAY);
}

export async function setCurrency(fiat) {
  try {
    store.settings.fiat = fiat;
    await storage.setItem(FIAT_KEY, fiat);
    await _loadRates();
    await _fetchRates();
  } catch (err) {
    alert.error({err});
  }
}
