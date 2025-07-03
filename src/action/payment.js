import {Linking} from 'react-native';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import store from '../store';
import * as nav from './nav';
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

export function selectPayment(payment) {
  store.selectedPayment = payment;
  nav.goTo('PaymentListItem');
}

export async function openExplorer() {
  try {
    const {txId} = store.selectedPayment;
    const url = `${store.config.explorer}/tx/${txId}`;
    await Linking.openURL(url);
  } catch (err) {
    log.error(err);
  }
}
