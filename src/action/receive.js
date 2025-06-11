import Clipboard from '@react-native-clipboard/clipboard';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import {nap, toAmount, toSatoshis} from '../util';
import store from '../store';
import * as log from './log';
import * as alert from './alert';
import * as nav from '../action/nav';

export function initReceive() {
  store.receive.value = '';
  store.receive.onChain = false;
  store.settings.displayFiat = true;
  nav.goTo('ReceiveStack');
}

export async function fetchLimits() {
  try {
    await Promise.all([fetchLnLimits(), fetchOnchainLimits()]);
  } catch(err) {
    log.error(err);
  }
}

export async function fetchLnLimits() {
  const limitsLn = await liquid.fetchLightningLimits();
  store.receive.minSatLn = limitsLn.receive.minSat;
  store.send.minSatLn = limitsLn.send.minSat;
  log.trace(`Min Ln receive: ${store.receive.minSatLn}`);
}

export async function fetchOnchainLimits() {
  const limitsBtc = await liquid.fetchOnchainLimits();
  store.receive.minSatBtc = limitsBtc.receive.minSat;
  store.send.minSatBtc = limitsBtc.send.minSat;
  log.trace(`Min Btc receive: ${store.receive.minSatBtc}`);
}

export async function toggleOnchain() {
  store.receive.onChain = !store.receive.onChain;
}

export function toggleFiat() {
  const {value} = store.receive;
  const amountSat = toSatoshis(value, store.settings);
  store.settings.displayFiat = !store.settings.displayFiat;
  store.receive.value = toAmount(amountSat, store.settings, 2);
}

export function setAmount(value) {
  store.receive.value = value;
}

export async function fetchInvoice() {
  const {value, description, onChain} = store.receive;
  try {
    store.receive.invoice = null;
    while (!store.liquidConnected) {
      await nap(100);
    }
    const minSat = await _fetchMinSat(onChain);
    const prepareResponse = await liquid.prepareReceivePayment({
      amount: onChain ? undefined : {
        type: liquid.ReceiveAmountVariant.BITCOIN,
        payerAmountSat: value ? toSatoshis(value, store.settings) : minSat,
      },
      paymentMethod: onChain ? liquid.PaymentMethod.BITCOIN_ADDRESS : liquid.PaymentMethod.LIGHTNING,
    });
    store.receive.feesSat = prepareResponse.feesSat;
    log.trace(`Receive fees, in sats: ${store.receive.feesSat}`);
    const res = await liquid.receivePayment({prepareResponse, description});
    store.receive.invoice = res.destination;
    log.trace(`Invoice: ${store.receive.invoice}`);
  } catch (err) {
    if (err.message.includes('Could not contact servers:')) {
      log.error(err);
      return;
    }
    alert.error({err});
  }
}

async function _fetchMinSat(onChain) {
  if (onChain) {
    await fetchOnchainLimits();
  } else {
    await fetchLnLimits();
  }
  return onChain ? store.receive.minSatBtc : store.receive.minSatLn;
}

export function copyInvoice() {
  Clipboard.setString(store.receive.invoice);
}
