import Clipboard from '@react-native-clipboard/clipboard';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import store from '../store';
import * as log from './log';
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
    const prepareResponse = await liquid.prepareReceivePayment({
      payerAmountSat: value ? Number(value) : RECEIVE_MIN,
      paymentMethod: 'lightning',
    });
    store.receive.feesSat = prepareResponse.feesSat;
    log.info(`Receive fees, in sats: ${store.receive.feesSat}`);

    const res = await liquid.receivePayment({prepareResponse, description});
    store.receive.invoice = res.destination;
    log.info(`Invoice: ${store.receive.invoice}`);
  } catch (err) {
    alert.error({err});
  }
}

export function copyInvoice() {
  Clipboard.setString(store.receive.invoice);
}
