import {extendObservable} from 'mobx';
import {InputTypeVariant} from '@breeztech/react-native-breez-sdk-liquid';
import {
  toSatoshis,
  toFiatOrSatLabel,
  toSatLabel,
  toFiatLabel,
} from '../util';

const ComputedSend = store => {
  extendObservable(store, {
    get sendFlipLabel() {
      const {settings, send: {amount}} = store;
      const amountSat = toSatoshis(amount, settings);
      return !settings.displayFiat
        ? toFiatLabel(amountSat, settings)
        : toSatLabel(amountSat);
    },
    get sendMinMaxAmountLabel() {
      const {type} = JSON.parse(store.send.input);
      const {settings, send: {
        amount,
        minSatLn,
        maxSatLn,
        minSatBtc,
        maxSatBtc,
      }} = store;
      const minSat =
        type === InputTypeVariant.BITCOIN_ADDRESS ? minSatBtc :
        type === InputTypeVariant.LIQUID_ADDRESS ? 1 :
        minSatLn;
      const maxSat =
        type === InputTypeVariant.BITCOIN_ADDRESS ? maxSatBtc :
        type === InputTypeVariant.LIQUID_ADDRESS ? Infinity :
        maxSatLn;
      const amountSat = toSatoshis(amount, settings);
      if (amountSat >= maxSat) {
        return `${toFiatOrSatLabel(maxSat, settings)} maximum`;
      }
      return `${toFiatOrSatLabel(minSat, settings)} minimum`;
    },
    get sendAmountInvalid() {
      const {type} = JSON.parse(store.send.input);
      const {settings, send: {
        amount,
        minSatLn,
        maxSatLn,
        minSatBtc,
        maxSatBtc,
      }} = store;
      const amountSat = toSatoshis(amount, settings);
      return type === InputTypeVariant.BITCOIN_ADDRESS ?
        amountSat < minSatBtc || amountSat > maxSatBtc :
        type === InputTypeVariant.LIQUID_ADDRESS ? amountSat < 1 :
        amountSat < minSatLn || amountSat > maxSatLn;
    },
    get sendDescriptionTitle() {
      const {type} = JSON.parse(store.send.input);
      return (type === InputTypeVariant.BITCOIN_ADDRESS ||
        type === InputTypeVariant.LIQUID_ADDRESS) ?
        'Address' :
        'Description';
    },
    get sendDescriptionLabel() {
      const {type, address} = JSON.parse(store.send.input);
      return (type === InputTypeVariant.BITCOIN_ADDRESS ||
        type === InputTypeVariant.LIQUID_ADDRESS) ?
        address.address :
        (store.send.description || 'No description provided');
    },
    get sendAmountFiatLabel() {
      const {settings, send: {amount}} = store;
      const amountSat = toSatoshis(amount, settings);
      return toFiatLabel(amountSat, settings);
    },
    get sendAmountSatLabel() {
      const {settings, send: {amount}} = store;
      const amountSat = toSatoshis(amount, settings);
      return toSatLabel(amountSat);
    },
    get sendFeeFiatLabel() {
      const {settings, send: {feesSat}} = store;
      return toFiatLabel(feesSat || 0, settings);
    },
    get sendFeeSatLabel() {
      return toSatLabel(store.send.feesSat);
    },
    get sendTotalFiatLabel() {
      const {settings, send: {amount, feesSat}} = store;
      const amountSat = toSatoshis(amount, settings);
      const totalSat = amountSat + feesSat;
      return toFiatLabel(totalSat, settings);
    },
    get sendTotalSatLabel() {
      const {settings, send: {amount, feesSat}} = store;
      const amountSat = toSatoshis(amount, settings);
      return toSatLabel(amountSat + feesSat);
    },
  });
};

export default ComputedSend;
