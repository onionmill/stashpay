import {extendObservable} from 'mobx';
import {
  toSatoshis,
  toFiatOrSatLabel,
  toSatLabel,
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
      const {settings, receive: {value}} = store;
      const amountSat = toSatoshis(value, settings);
      return !settings.displayFiat
        ? toFiatLabel(amountSat, settings)
        : toSatLabel(amountSat);
    },
    get receiveMinValueLabel() {
      const {settings, receive: {onChain, minSatLn, minSatBtc}} = store;
      const minSat = onChain ? minSatBtc : minSatLn;
      return `${toFiatOrSatLabel(minSat, settings)} minimum`;
    },
    get receiveAmountInvalid() {
      const {settings, receive: {value, onChain, minSatLn, minSatBtc}} = store;
      const amountSat = toSatoshis(value, settings);
      return onChain ? amountSat < minSatBtc : amountSat < minSatLn;
    },
    get receiveAmountFiatLabel() {
      const {settings, receive: {value}} = store;
      const amountSat = toSatoshis(value, settings);
      return toFiatLabel(amountSat, settings);
    },
    get receiveAmountSatLabel() {
      const {settings, receive: {value}} = store;
      const amountSat = toSatoshis(value, settings);
      return toSatLabel(amountSat);
    },
    get receiveFeesFiatLabel() {
      return toFiatLabel(store.receive.feesSat, store.settings);
    },
    get receiveFeesSatLabel() {
      return toSatLabel(store.receive.feesSat);
    },
    get receiveTotalFiatLabel() {
      const {settings, receive: {value, feesSat}} = store;
      const amountSat = toSatoshis(value, settings);
      return toFiatLabel(amountSat - feesSat, settings);
    },
    get receiveTotalSatLabel() {
      const {settings, receive: {value, feesSat}} = store;
      const amountSat = toSatoshis(value, settings);
      return toSatLabel(amountSat - feesSat);
    },
    get receiveEventAmountFiatLabel() {
      const {settings, receiveEvent: {amountSat, feesSat}} = store;
      return toFiatLabel(amountSat + feesSat, settings);
    },
    get receiveEventAmountSatLabel() {
      const {amountSat, feesSat} = store.receiveEvent;
      return toSatLabel(amountSat + feesSat);
    },
    get receiveEventFeesFiatLabel() {
      return toFiatLabel(store.receiveEvent.feesSat, store.settings);
    },
    get receiveEventFeesSatLabel() {
      return toSatLabel(store.receiveEvent.feesSat);
    },
    get receiveEventTotalFiatLabel() {
      return toFiatLabel(store.receiveEvent.amountSat, store.settings);
    },
    get receiveEventTotalSatLabel() {
      return toSatLabel(store.receiveEvent.amountSat);
    },
  });
};

export default ComputedReceive;
