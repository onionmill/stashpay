import Frisbee from 'frisbee';
import {action} from 'mobx';

import store from '../store';
import {poll} from '../util';
import * as log from './log';

const POLL_DELAY = 15 * 60 * 1000;

const api = new Frisbee({
  baseURI: 'https://api.coinbase.com',
  headers: {'Accept': 'application/json'},
});

const _getRates = action(async () => {
  try {
    const {fiat, exchangeRate} = store.settings;
    const {body, err} = await api.get('/v2/exchange-rates?currency=' + fiat);
    if (err) {
      throw err;
    }
    exchangeRate[fiat] = Number(body.data.rates.BTC);
    // db.save();
    log.trace(`Fiat rates: ${JSON.stringify(exchangeRate)}`);
  } catch (err) {
    alert.error({message: 'Error fetching fiat rate', err});
  }
});

export async function pollExchangeRate() {
  await poll(() => _getRates(), POLL_DELAY);
}
