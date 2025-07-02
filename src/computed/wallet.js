import {extendObservable} from 'mobx';

import {toSatLabel, toFiatLabel} from '../util';

const ComputedWallet = store => {
  extendObservable(store, {
    get balanceSatLabel() {
      return toSatLabel(store.balance);
    },
    get balanceFiatLabel() {
      const {balance, settings} = store;
      return toFiatLabel(balance || 0, settings);
    },
  });
};

export default ComputedWallet;
