import {Linking} from 'react-native';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import store from '../store';
import * as log from './log';
import * as storage from './local-storage';

const PAYMENTS_KEY = 'payments';

export async function loadPayments() {
  try {
    const payments = await storage.getItem(PAYMENTS_KEY);
    log.trace(`Cached payments: ${payments && payments.length}`);
    if (!payments) {
      return;
    }
    store.payments = payments;
  } catch (err) {
    log.error(err);
  }
}

export async function fetchPayments() {
  try {
    const payments = await liquid.listPayments({});
    payments.sort((a,b) => b.timestamp - a.timestamp);
    await storage.setItem(PAYMENTS_KEY, payments);
    log.trace(`Storing payments: ${payments.length}`);
    store.payments = payments;
  } catch (err) {
    log.error(err);
  }
}

export async function deletePayments() {
  await storage.removeItem(PAYMENTS_KEY);
}

export async function openExplorer(payment) {
  try {
    const url = `${store.config.explorer}/tx/${payment.txId}`;
    await Linking.openURL(url);
  } catch (err) {
    log.error(err);
  }
}
