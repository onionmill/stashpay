import {action} from 'mobx';

import store from '../store';
import {poll} from '../util';
import * as log from './log';
import * as nav from './nav';
import * as storage from './local-storage';

const RATES_KEY = 'rates';
const POLL_DELAY = 15 * 60 * 1000;

export const loadRates = action(async () => {
  try {
    const {fiat, exchangeRate} = store.settings;
    const rates = await storage.getItem(RATES_KEY);
    if (!rates) {
      return;
    }
    exchangeRate[fiat] = Number(rates.BTC);
    log.trace(`Cached rates: ${JSON.stringify(exchangeRate)}`);
  } catch (err) {
    alert.error({err});
  }
});

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

export async function pollRates() {
  await poll(() => _fetchRates(), POLL_DELAY);
}

export function initFiatSelect() {
  nav.goTo('FiatSelect');
}

export async function setCurrency(fiat) {
  store.settings.fiat = fiat;
  await _fetchRates();
}
