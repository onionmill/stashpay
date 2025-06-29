import {extendObservable} from 'mobx';

import {formatNumber, toFiatLabel} from '../util';

const ComputedWallet = store => {
  extendObservable(store, {
    get balanceSatLabel() {
      return formatNumber(store.balance) + ' sats';
    },
    get balanceFiatLabel() {
      const {balance, settings} = store;
      return toFiatLabel(balance || 0, settings);
    },
  });
};

export default ComputedWallet;
