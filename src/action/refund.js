import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import store from '../store';
import * as nav from './nav';
import * as log from './log';
import * as alert from './alert';

export async function selectRefundable() {
  store.refund.swapAddress = null;
  store.refund.refundAddress = '';
  try {
    store.refund.processing = true;
    nav.goTo('RefundPayment');
    const {timestamp} = store.selectedPayment;
    const refundables = await liquid.listRefundables();
    const selected = refundables.find(r => r.timestamp === timestamp);
    log.trace(`Selected refundable: ${JSON.stringify(selected)}`);
    if (!selected) {
      throw new Error('No refundable with that timestamp found!');
    }
    store.refund.swapAddress = selected.swapAddress;
  } catch (err) {
    nav.goBackTo('PaymentListItem');
    alert.error({err});
  } finally {
    store.refund.processing = false;
  }
}

export function setRefundAddress(refundAddress) {
  store.refund.refundAddress = refundAddress;
  log.trace(`Refund address: ${store.refund.refundAddress}`);
}

export async function refundToAddress() {
  try {
    store.refund.processing = true;
    const {swapAddress, refundAddress} = store.refund;
    if (!refundAddress) {
      throw new Error('Set a refund address!');
    }
    const fees = await liquid.recommendedFees();
    log.trace(`Refund fees: ${JSON.stringify(fees)}`);
    const refundResponse = await liquid.refund({
      swapAddress,
      refundAddress,
      feeRateSatPerVbyte: fees.fastestFee,
    });
    log.trace(`Refund response: ${JSON.stringify(refundResponse)}`);
    alert.info('Refund sent!');
    nav.goBackTo('Main');
  } catch (err) {
    alert.error({err});
  } finally {
    store.refund.processing = false;
  }
}
