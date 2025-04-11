import {extendObservable} from 'mobx';
import {formatNumber, FIATS, UNITS} from '../util';

const ComputedReceive = store => {
  extendObservable(store, {
    get receiveInputPrefixLabel() {
      const {fiat, displayFiat} = store.settings;
      return displayFiat ? FIATS[fiat].display : null;
    },
    get receiveInputSuffixLabel() {
      const {unit, displayFiat} = store.settings;
      return displayFiat ? null : ' ' + UNITS[unit].display;
    },
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
