import Clipboard from '@react-native-clipboard/clipboard';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import store from '../store';
import * as nav from './nav';
import * as alert from './alert';

export async function initSendAddress() {
  store.send.value = null;
  store.send.destination = null;
  store.send.feesSat = null;
  store.send.description = null;
}

export async function readQRCode(data) {
  if (store.send.destination || !data && !data.length) {
    return;
  }
  store.send.destination = data[0].value;
  await parseUri(data[0].value);
}

async function parseUri(uri) {
  try {
    console.log(`Uri to parse: ${uri}`);
    const input = await liquid.parse(uri);
    console.log(`Parsed payment data: ${JSON.stringify(input)}`);
    if (input.type === liquid.InputTypeVariant.BOLT11) {
      await prepareBolt11Payment(input.invoice);
    } else {
      return alert.error({message: 'Unknown QR code!'});
    }
    nav.goTo('SendStack', {screen: 'SendConfirm'});
  } catch (err) {
    alert.error({err});
  }
}

async function prepareBolt11Payment(invoice) {
  const amountSat = invoice.amountMsat / 1000;
  const prepareSendResponse = await liquid.prepareSendPayment({
    destination: invoice.bolt11,
    amountSat,
  });
  console.log(`Prepare send response: ${JSON.stringify(prepareSendResponse)}`);
  store.send.value = amountSat;
  store.send.destination = JSON.stringify(prepareSendResponse.destination);
  store.send.feesSat = prepareSendResponse.feesSat;
  store.send.description = invoice.description;
}

export async function pasteInvoice() {
  const uri = await Clipboard.getString();
  await parseUri(uri);
}

export function setAmount(value) {
  store.send.value = value;
}

export function setFeeRate(feeRate) {
  store.send.feeRate = feeRate;
}

export async function validateAmount() {
  try {
    nav.goTo('SendWait', {
      message: 'Checking...',
    });
    // await createTransaction();
    nav.goTo('SendConfirm');
  } catch (err) {
    nav.goTo('SendAmount');
    alert.error({err});
  }
}

export async function validateSend() {
  try {
    nav.goTo('SendWait', {
      message: 'Sending...',
    });
    await sendPayment();
    nav.goTo('SendSuccess');
  } catch (err) {
    nav.goTo('SendConfirm');
    alert.error({err});
  }
}

async function sendPayment() {
  try {
    const prepareResponse = {
      destination: JSON.parse(store.send.destination),
      feesSat: store.send.feesSat,
    };
    const sendResponse = await liquid.sendPayment({prepareResponse});
    console.log(`Send response: ${JSON.stringify(sendResponse)}`);
    return sendResponse.payment;
  } catch (err) {
    alert.error({err});
  }
}
