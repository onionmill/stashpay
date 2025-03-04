import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import store from '../store';
import * as log from './log';

export async function fetchRefundables() {
  try {
    store.refundables = await liquid.listRefundables();
    log.trace(`Refundables: ${JSON.stringify(store.refundables)}`);
  } catch (err) {
    log.error(err);
  }
}

export async function refund(refundable) {
  try {
    const fees = await liquid.recommendedFees();
    log.trace(`Refund fees: ${JSON.stringify(fees)}`);
    const refundResponse = await liquid.refund({
      swapAddress: refundable.swapAddress,
      refundAddress: store.refundAddress,
      feeRateSatPerVbyte: fees.fastestFee,
    });
    log.trace(`Refund response: ${JSON.stringify(refundResponse)}`);
  } catch (err) {
    log.error(err);
  }
}
