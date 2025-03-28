import {extendObservable} from 'mobx';

import {formatNumber, formatFiat, calculateExchangeRate} from '../util';

const ComputedWallet = store => {
  extendObservable(store, {
    get balanceSatLabel() {
      return formatNumber(store.balance) + ' sats';
    },
    get balanceFiatLabel() {
      const {balance, settings} = store;
      return formatFiat(calculateExchangeRate(balance || 0, settings), settings.fiat);
    },
  });
};

export default ComputedWallet;
