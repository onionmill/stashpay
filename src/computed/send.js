import {extendObservable} from 'mobx';
import {formatNumber} from '../util';

const ComputedSend = store => {
  extendObservable(store, {
    get sendValueLabel() {
      return formatNumber(store.send.value);
    },
    get sendFeeLabel() {
      const {feesSat} = store.send;
      return feesSat ? formatNumber(feesSat) + ' sats' : 'Unknown';
    },
  });
};

export default ComputedSend;
