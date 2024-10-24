import {extendObservable} from 'mobx';
import {InputTypeVariant} from '@breeztech/react-native-breez-sdk-liquid';
import {formatNumber} from '../util';

const ComputedSend = store => {
  extendObservable(store, {
    get sendMinValueLabel() {
      const {type} = JSON.parse(store.send.input);
      const {minSatBtc, minSatLn} = store.send;
      return `${
        type === InputTypeVariant.BITCOIN_ADDRESS ? minSatBtc :
        type === InputTypeVariant.LIQUID_ADDRESS ? 1 :
        minSatLn} minimum`;
    },
    get sendValueLabel() {
      return formatNumber(store.send.value) + ' sats';
    },
    get sendFeeLabel() {
      return formatNumber(store.send.feesSat) + ' sats';
    },
  });
};

export default ComputedSend;
