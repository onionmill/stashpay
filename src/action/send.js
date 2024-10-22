import Clipboard from '@react-native-clipboard/clipboard';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import store from '../store';
import * as nav from './nav';
import * as log from './log';
import * as alert from './alert';

export async function initSendAddress() {
  store.send.rawUri = null;
  store.send.input = null;
  store.send.value = null;
  store.send.destination = null;
  store.send.feesSat = null;
  store.send.description = null;
}

//
// URI Parsing and Preparating
//

export function setUri(rawUri) {
  store.send.rawUri = rawUri;
}

export async function pasteInvoice() {
  store.send.rawUri = await Clipboard.getString();
  await parseUri();
}

export async function readQRCode(data) {
  if (store.send.rawUri || !data && !data.length) {
    return;
  }
  store.send.rawUri = data[0].value;
  await parseUri();
}

export async function parseUri() {
  try {
    log.info(`Uri to parse: ${store.send.rawUri}`);
    const input = await liquid.parse(_removeBip353Prefix(store.send.rawUri));
    store.send.input = JSON.stringify(input);
    log.info(`Parsed payment data: ${store.send.input}`);
    if (input.type === liquid.InputTypeVariant.BOLT11) {
      await _prepareBolt11Payment(input.invoice);
    } else if (input.type === liquid.InputTypeVariant.LN_URL_PAY) {
      await _parseLnurlPayment();
    } else if (input.type === liquid.InputTypeVariant.BITCOIN_ADDRESS) {
      await _parseOnchainData();
    } else if (input.type === liquid.InputTypeVariant.LIQUID_ADDRESS) {
      await _parseOnchainData();
    } else {
      return alert.error({message: 'Unknown QR code!'});
    }
  } catch (err) {
    alert.error({err});
  }
}

function _removeBip353Prefix(uri) {
  return uri && uri.replace(/^₿/g, '');
}

async function _prepareBolt11Payment(invoice) {
  const amountSat = invoice.amountMsat / 1000;
  const prepareSendResponse = await liquid.prepareSendPayment({
    destination: invoice.bolt11,
    amountSat,
  });
  log.info(`Prepare send response: ${JSON.stringify(prepareSendResponse)}`);
  store.send.value = amountSat;
  store.send.destination = JSON.stringify(prepareSendResponse.destination);
  store.send.feesSat = prepareSendResponse.feesSat;
  store.send.description = invoice.description;
  nav.goTo('SendStack', {screen: 'SendConfirm'});
}

async function _parseLnurlPayment() {
  const {data} = JSON.parse(store.send.input);
  store.send.description = _parseLnurlMetadata(data.metadataStr);
  nav.goTo('SendStack', {screen: 'SendAmount'});
}

function _parseLnurlMetadata(str) {
  if (!typeof str === 'string') {
    return null;
  }
  const arr = JSON.parse(str);
  const tag = arr.find(d => d.length && d[0] === 'text/plain');
  return tag && tag.length === 2 && tag[1] || null;
}

function _parseOnchainData() {
  const {address} = JSON.parse(store.send.input);
  store.send.value = address.amountSat ? String(address.amountSat) : null;
  store.send.description = address.label;
  nav.goTo('SendStack', {screen: 'SendAmount'});
}

//
// Payment Amount
//

export function setAmount(value) {
  store.send.value = value;
}

export async function validateAmount() {
  try {
    const {type} = JSON.parse(store.send.input);
    if (type === liquid.InputTypeVariant.BITCOIN_ADDRESS) {
      await _prepareOnchainPayment();
    } else if (type === liquid.InputTypeVariant.LIQUID_ADDRESS) {
      await _prepareLiquidPayment();
    } else if (type === liquid.InputTypeVariant.LN_URL_PAY) {
      await _prepareLnurlPayment();
    }
  } catch (err) {
    nav.goTo('SendAmount');
    alert.error({err});
  }
}

async function _prepareOnchainPayment() {
  const amountSat = Number(store.send.value);
  const prepareResponse = await liquid.preparePayOnchain({
    amount: {
      type: liquid.PayOnchainAmountVariant.RECEIVER,
      amountSat,
    },
  });
  store.send.destination = JSON.stringify(prepareResponse);
  store.send.feesSat = prepareResponse.totalFeesSat;
  nav.goTo('SendConfirm');
}

async function _prepareLiquidPayment() {
  const amountSat = Number(store.send.value);
  const {address} = JSON.parse(store.send.input);
  const prepareResponse = await liquid.prepareSendPayment({
    destination: address.address,
    amountSat,
  });
  store.send.destination = JSON.stringify(prepareResponse);
  store.send.feesSat = prepareResponse.feesSat;
  nav.goTo('SendConfirm');
}

async function _prepareLnurlPayment() {
  const {data} = JSON.parse(store.send.input);
  const amountMsat = Number(store.send.value) * 1000;
  const prepareResponse = await liquid.prepareLnurlPay({
    data,
    amountMsat,
    validateSuccessActionUrl: true,
  });
  store.send.destination = JSON.stringify(prepareResponse);
  store.send.feesSat = prepareResponse.feesSat;
  nav.goTo('SendConfirm');
}

//
// Payment Sending
//

export async function validateSend() {
  try {
    nav.goTo('SendWait', {
      message: 'Sending...',
    });
    await _sendPayment();
    nav.goTo('SendSuccess');
  } catch (err) {
    nav.goTo('SendConfirm');
    alert.error({err});
  }
}

async function _sendPayment() {
  const {type} = JSON.parse(store.send.input);
  if (type === liquid.InputTypeVariant.BOLT11) {
    await _sendBolt11Payment();
  } else if (type === liquid.InputTypeVariant.LN_URL_PAY) {
    await _sendLnurlPayment();
  } else if (type === liquid.InputTypeVariant.BITCOIN_ADDRESS) {
    await _sendOnchainPayment();
  } else if (type === liquid.InputTypeVariant.LIQUID_ADDRESS) {
    await _sendLiquidPayment();
  }
}

async function _sendBolt11Payment() {
  const prepareResponse = {
    destination: JSON.parse(store.send.destination),
    feesSat: store.send.feesSat,
  };
  const sendResponse = await liquid.sendPayment({prepareResponse});
  log.info(`Send response: ${JSON.stringify(sendResponse)}`);
  return sendResponse.payment;
}

async function _sendLnurlPayment() {
  const lnUrlPayResult = await liquid.lnurlPay({
    prepareResponse: JSON.parse(store.send.destination),
  });
  log.info(`LnurlPay Result: ${JSON.stringify(lnUrlPayResult)}`);
}

async function _sendOnchainPayment() {
  const {address} = JSON.parse(store.send.input);
  const payOnchainRes = await liquid.payOnchain({
    address: address.address,
    prepareResponse: JSON.parse(store.send.destination),
  });
  log.info(`PayOnchain Result: ${JSON.stringify(payOnchainRes)}`);
}

async function _sendLiquidPayment() {
  const sendResponse = await liquid.sendPayment({
    prepareResponse: JSON.parse(store.send.destination),
  });
  log.info(`Send response: ${JSON.stringify(sendResponse)}`);
  return sendResponse.payment;
}
