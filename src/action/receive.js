import Clipboard from '@react-native-clipboard/clipboard';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import store from '../store';
import * as alert from './alert';
import {nap} from '../util';

const RECEIVE_MIN = 1000;

export function setAmount(value) {
  store.receive.value = value;
}

export async function fetchInvoice() {
  const {value, description} = store.receive;
  try {
    store.receive.invoice = null;
    while (!store.liquidConnected) {
      await nap(100);
    }
    const payerAmountSat = value ? Number(value) : RECEIVE_MIN;
    const prepareRes = await liquid.prepareReceivePayment({payerAmountSat});
    store.receive.feesSat = prepareRes.feesSat;
    console.log(`Receive fees, in sats: ${store.receive.feesSat}`);

    const res = await liquid.receivePayment({prepareRes, description});
    store.receive.invoice = res.invoice;
    console.log(`Invoice: ${store.receive.invoice}`);
  } catch (err) {
    alert.error({err});
  }
}

export function copyInvoice() {
  Clipboard.setString(store.receive.invoice);
}
