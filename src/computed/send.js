import {extendObservable} from 'mobx';
import {formatNumber} from '../util';

const ComputedSend = store => {
  extendObservable(store, {
    get sendValueLabel() {
      return formatNumber(store.send.value);
    },
    get sendFeeLabel() {
      return formatNumber(store.send.feesSat);
    },
  });
};

export default ComputedSend;
