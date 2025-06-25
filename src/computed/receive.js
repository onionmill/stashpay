import {extendObservable} from 'mobx';
import {
  toSatoshis,
  toAmountFlipLabel,
  toAmountLabel,
  formatNumber,
  toFiatLabel,
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
    get receiveAmountInvalid() {
      const {value, onChain, minSatLn, minSatBtc} = store.receive;
      const amountSat = toSatoshis(value, store.settings);
      return onChain ? amountSat < minSatBtc : amountSat < minSatLn;
    },
    get receiveFeeLabel() {
      const {feesSat} = store.receive;
      const fiat = toFiatLabel(feesSat || 0, store.settings);
      return `Network fee: ${formatNumber(feesSat)} sats (${fiat})`;
    },
    get receiveEventAmountFiatLabel() {
      const {settings, receiveEvent: {amountSat, feesSat}} = store;
      return toFiatLabel(amountSat + feesSat, settings);
    },
    get receiveEventAmountSatLabel() {
      const {amountSat, feesSat} = store.receiveEvent;
      return formatNumber(amountSat + feesSat) + ' sats';
    },
    get receiveEventFeesFiatLabel() {
      return toFiatLabel(store.receiveEvent.feesSat, store.settings);
    },
    get receiveEventFeesSatLabel() {
      return formatNumber(store.receiveEvent.feesSat) + ' sats';
    },
    get receiveEventTotalFiatLabel() {
      return toFiatLabel(store.receiveEvent.amountSat, store.settings);
    },
    get receiveEventTotalSatLabel() {
      return formatNumber(store.receiveEvent.amountSat) + ' sats';
    },
  });
};

export default ComputedReceive;
