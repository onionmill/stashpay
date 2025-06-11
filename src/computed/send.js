import {extendObservable} from 'mobx';
import {InputTypeVariant} from '@breeztech/react-native-breez-sdk-liquid';
import {
  toSatoshis,
  toAmountFlipLabel,
  toAmountLabel,
  formatNumber,
  toFiatLabel,
  UNITS,
} from '../util';

const ComputedSend = store => {
  extendObservable(store, {
    get sendFlipLabel() {
      const {unit, displayFiat} = store.settings;
      const {value} = store.send;
      const amountSat = toSatoshis(value, store.settings);
      const amount = toAmountFlipLabel(amountSat, store.settings);
      const suffix = !displayFiat ? '' : ' ' + UNITS[unit].display;
      return `${amount}${suffix}`;
    },
    get sendMinValueLabel() {
      const {type} = JSON.parse(store.send.input);
      const {minSatBtc, minSatLn} = store.send;
      const amount = toAmountLabel(
        type === InputTypeVariant.BITCOIN_ADDRESS ? minSatBtc :
        type === InputTypeVariant.LIQUID_ADDRESS ? 1 :
        minSatLn, store.settings);
      return `${amount}${store.receiveInputSuffixLabel} minimum`;
    },
    get sendAmountInvalid() {
      const {type} = JSON.parse(store.send.input);
      const {value, minSatLn, minSatBtc} = store.send;
      const amountSat = toSatoshis(value, store.settings);
      return type === InputTypeVariant.BITCOIN_ADDRESS ? amountSat < minSatBtc :
        type === InputTypeVariant.LIQUID_ADDRESS ? amountSat < 1 :
        amountSat < minSatLn;
    },
    get sendValueFiatLabel() {
      const {settings, send: {value}} = store;
      const amountSat = toSatoshis(value, settings);
      return toFiatLabel(amountSat, settings);
    },
    get sendValueSatLabel() {
      const {value} = store.send;
      const amountSat = toSatoshis(value, store.settings);
      return formatNumber(amountSat) + ' sats';
    },
    get sendFeeFiatLabel() {
      const {settings, send: {feesSat}} = store;
      return toFiatLabel(feesSat || 0, settings);
    },
    get sendFeeSatLabel() {
      return formatNumber(store.send.feesSat) + ' sats';
    },
    get sendTotalFiatLabel() {
      const {settings, send: {value, feesSat}} = store;
      const amountSat = toSatoshis(value, settings);
      const totalSat = amountSat + feesSat;
      return toFiatLabel(totalSat, settings);
    },
    get sendTotalSatLabel() {
      const {value, feesSat} = store.send;
      const amountSat = toSatoshis(value, store.settings);
      return formatNumber(amountSat + feesSat) + ' sats';
    },
  });
};

export default ComputedSend;
