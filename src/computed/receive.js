import {extendObservable} from 'mobx';
import {formatNumber} from '../util';

const ComputedReceive = store => {
  extendObservable(store, {
    get receiveMinValueLabel() {
      const {onChain, minSatLn, minSatBtc} = store.receive;
      return `${onChain ? minSatBtc : minSatLn} sats`;
    },
    get receiveTypeLabel() {
      const {onChain, minSatBtc} = store.receive;
      return onChain ? `Send min ${formatNumber(minSatBtc)} sats` : null;
    },
    get receiveFeeLabel() {
      const {feesSat} = store.receive;
      return `Fee to receive: ${formatNumber(feesSat)} sats`;
    },
    get receiveCopyBtnLabel() {
      const {onChain} = store.receive;
      return `Copy ${onChain ? 'BTC Address' : 'LN Invoice'}`;
    },
  });
};

export default ComputedReceive;
