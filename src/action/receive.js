import * as bip21 from 'bip21';
import RNShare from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import {UNITS, nap, toAmount, toSatoshis, normalizeAmount} from '../util';
import store from '../store';
import * as log from './log';
import * as alert from './alert';
import * as nav from '../action/nav';

export async function initReceive() {
  store.receive.amount = '';
  store.receive.onChain = false;
  store.settings.displayFiat = true;
  nav.goTo('ReceiveStack');
  await fetchLimits(); // after nav for performance
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
  store.receive.maxSatLn = limitsLn.receive.maxSat;
  store.send.minSatLn = limitsLn.send.minSat;
  store.send.maxSatLn = limitsLn.send.maxSat;
  log.trace(`Min Ln receive: ${store.receive.minSatLn}`);
  log.trace(`Max Ln receive: ${store.receive.maxSatLn}`);
  log.trace(`Min Ln send: ${store.send.minSatLn}`);
  log.trace(`Max Ln send: ${store.send.maxSatLn}`);
}

export async function fetchOnchainLimits() {
  const limitsBtc = await liquid.fetchOnchainLimits();
  store.receive.minSatBtc = limitsBtc.receive.minSat;
  store.receive.maxSatBtc = limitsBtc.receive.maxSat;
  store.send.minSatBtc = limitsBtc.send.minSat;
  store.send.maxSatBtc = limitsBtc.send.maxSat;
  log.trace(`Min Btc receive: ${store.receive.minSatBtc}`);
  log.trace(`Max Btc receive: ${store.receive.maxSatBtc}`);
  log.trace(`Min Btc send: ${store.send.minSatBtc}`);
  log.trace(`Max Btc send: ${store.send.maxSatBtc}`);
}

export function toggleOnchain() {
  store.receive.onChain = !store.receive.onChain;
}

export function toggleFiat() {
  const {amount} = store.receive;
  const amountSat = toSatoshis(amount, store.settings);
  store.settings.displayFiat = !store.settings.displayFiat;
  store.receive.amount = toAmount(amountSat, store.settings, 2);
}

export function setAmount(amount) {
  store.receive.amount = normalizeAmount(amount);
}

export async function fetchInvoice() {
  const {settings, receive: {amount, unified, onChain}} = store;
  try {
    store.receive.invoice = null;
    while (!store.liquidConnected) {
      await nap(100);
    }
    const amountSat = toSatoshis(amount, settings);
    let response;
    if (unified && amountSat >= store.receive.minSatBtc) {
      response = await _fetchUnifiedInvoice();
    } else if (onChain) {
      response = await _fetchBtcInvoice();
    } else {
      response = await _fetchLnInvoice();
    }
    store.receive.feesSat = response.feesSat;
    store.receive.invoice = response.invoice;
    log.trace(`Invoice: ${store.receive.invoice}`);
  } catch (err) {
    if (err.message.includes('Could not contact servers:')) {
      log.error(err);
      return;
    }
    alert.error({err});
  }
}

async function _fetchUnifiedInvoice() {
  const [lnRes, btcRes] = await Promise.all([_fetchLnInvoice(), _fetchBtcInvoice()]);
  const invoice = _wrapBip21Unified(btcRes.invoice, lnRes.invoice);
  return {invoice, feesSat: lnRes.feesSat};
}

async function _fetchBtcInvoice() {
  const {receive: {description}} = store;
  const prepareResponse = await liquid.prepareReceivePayment({
    amount: undefined,
    paymentMethod: liquid.PaymentMethod.BITCOIN_ADDRESS,
  });
  log.trace(`Onchain receive fees: ${prepareResponse.feesSat}`);
  const res = await liquid.receivePayment({prepareResponse, description});
  const invoice = _wrapBip21Btc(res.destination);
  log.trace(`Onchain invoice: ${invoice}`);
  return {invoice, feesSat: prepareResponse.feesSat};
}

async function _fetchLnInvoice() {
  const {settings, receive: {amount, description}} = store;
  const prepareResponse = await liquid.prepareReceivePayment({
    amount: {
      type: liquid.ReceiveAmountVariant.BITCOIN,
      payerAmountSat: toSatoshis(amount, settings),
    },
    paymentMethod: liquid.PaymentMethod.BOLT11_INVOICE,
  });
  log.trace(`Ln receive fees: ${prepareResponse.feesSat}`);
  const res = await liquid.receivePayment({prepareResponse, description});
  log.trace(`Ln invoice: ${res.destination}`);
  return {invoice: res.destination, feesSat: prepareResponse.feesSat};
}

function _wrapBip21Btc(btcInvoice) {
  const {settings, receive: {amount}} = store;
  const {address} = bip21.decode(btcInvoice);
  const amountBtc = toSatoshis(amount, settings) / UNITS.btc.denominator;
  return bip21.encode(address, {amount: amountBtc});
}

function _wrapBip21Unified(btcInvoice, lnInvoice) {
  const {settings, receive: {amount}} = store;
  const {address} = bip21.decode(btcInvoice);
  const amountBtc = toSatoshis(amount, settings) / UNITS.btc.denominator;
  return bip21.encode(address, {amount: amountBtc, lightning: lnInvoice});
}

export function copyInvoice() {
  Clipboard.setString(store.receive.invoice);
}

export async function shareInvoice() {
  try {
    await RNShare.open({message: store.receive.invoice});
  } catch (err) {
    log.warn(err.message);
  }
}
