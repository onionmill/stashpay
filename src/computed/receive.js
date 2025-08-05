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
      const {unit, fiat, displayFiat} = store.settings;
      return displayFiat ? FIATS[fiat].display : UNITS[unit].display;
    },
    get receiveInputSuffixLabel() {
      return '';
    },
    get receiveFlipLabel() {
      const {settings, receive: {amount}} = store;
      const amountSat = toSatoshis(amount, settings);
      return !settings.displayFiat
        ? toFiatLabel(amountSat, settings)
        : toSatLabel(amountSat);
    },
    get receiveMinMaxAmountLabel() {
      const {settings, receive: {
        amount,
        onChain,
        minSatLn,
        maxSatLn,
        minSatBtc,
        maxSatBtc,
      }} = store;
      const minSat = onChain ? minSatBtc : minSatLn;
      const maxSat = onChain ? maxSatBtc : maxSatLn;
      const amountSat = toSatoshis(amount, settings);
      if (amountSat >= maxSat) {
        return `${toFiatOrSatLabel(maxSat, settings)} maximum`;
      }
      return `${toFiatOrSatLabel(minSat, settings)} minimum`;
    },
    get receiveAmountInvalid() {
      const {settings, receive: {
        amount,
        onChain,
        minSatLn,
        maxSatLn,
        minSatBtc,
        maxSatBtc,
      }} = store;
      const amountSat = toSatoshis(amount, settings);
      return onChain ?
        amountSat < minSatBtc || amountSat > maxSatBtc :
        amountSat < minSatLn || amountSat > maxSatLn;
    },
    get receiveAmountFiatLabel() {
      const {settings, receive: {amount}} = store;
      const amountSat = toSatoshis(amount, settings);
      return toFiatLabel(amountSat, settings);
    },
    get receiveAmountSatLabel() {
      const {settings, receive: {amount}} = store;
      const amountSat = toSatoshis(amount, settings);
      return toSatLabel(amountSat);
    },
    get receiveFeesFiatLabel() {
      return toFiatLabel(store.receive.feesSat, store.settings);
    },
    get receiveFeesSatLabel() {
      return toSatLabel(store.receive.feesSat);
    },
    get receiveTotalFiatLabel() {
      const {settings, receive: {amount, feesSat}} = store;
      const amountSat = toSatoshis(amount, settings);
      return toFiatLabel(amountSat - feesSat, settings);
    },
    get receiveTotalSatLabel() {
      const {settings, receive: {amount, feesSat}} = store;
      const amountSat = toSatoshis(amount, settings);
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
