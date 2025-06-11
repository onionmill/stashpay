import {extendObservable} from 'mobx';
import {
  toSatoshis,
  toAmountFlipLabel,
  toAmountLabel,
  formatNumber,
  FIATS,
  UNITS,
} from '../util';

const ComputedReceive = store => {
  extendObservable(store, {
    get receiveInputPrefixLabel() {
      const {fiat, displayFiat} = store.settings;
      return displayFiat ? FIATS[fiat].display : '';
    },
    get receiveInputSuffixLabel() {
      const {unit, displayFiat} = store.settings;
      return displayFiat ? '' : ' ' + UNITS[unit].display;
    },
    get receiveFlipLabel() {
      const {unit, displayFiat} = store.settings;
      const {value} = store.receive;
      const amountSat = toSatoshis(value, store.settings);
      const amount = toAmountFlipLabel(amountSat, store.settings);
      const suffix = !displayFiat ? '' : ' ' + UNITS[unit].display;
      return `${amount}${suffix}`;
    },
    get receiveMinValueLabel() {
      const {onChain, minSatLn, minSatBtc} = store.receive;
      const amount = toAmountLabel(onChain ? minSatBtc : minSatLn, store.settings);
      return `${amount}${store.receiveInputSuffixLabel} minimum`;
    },
    get receiveTypeLabel() {
      const {onChain, minSatBtc} = store.receive;
      return onChain ? `Send min ${formatNumber(minSatBtc)} sats` : null;
    },
    get receiveAmountInvalid() {
      const {value, onChain, minSatLn, minSatBtc} = store.receive;
      const amountSat = toSatoshis(value, store.settings);
      return onChain ? amountSat < minSatBtc : amountSat < minSatLn;
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
