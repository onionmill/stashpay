import Frisbee from 'frisbee';

import store from '../store';
import {poll} from '../util';
import * as log from './log';

const POLL_DELAY = 15 * 60 * 1000;

const api = new Frisbee({
  baseURI: 'https://api.coinbase.com',
  headers: {'Accept': 'application/json'},
});

export async function getRates() {
  try {
    const {body, err} = await api.get('/v2/exchange-rates?currency=BTC');
    if (err) {
      throw err;
    }
    const fiat = store.settings.fiat;
    const rate = Object.keys(body.data.rates).find(r => r.toLowerCase() === fiat);
    store.settings.exchangeRate[fiat] = body.data.rates[rate];
    // db.save();
    log.trace(`Fiat rates: ${JSON.stringify(store.settings.exchangeRate)}`);
  } catch (err) {
    alert.error({message: 'Error fetching fiat rate', err});
  }
}

export async function pollExchangeRate() {
  await poll(() => getRates(), POLL_DELAY);
}
