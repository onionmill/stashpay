import {extendObservable} from 'mobx';
import {PaymentType} from '@breeztech/react-native-breez-sdk-liquid';
import {toFiatLabel, formatDate, toSatLabel} from '../util';

const ComputedPayment = store => {
  extendObservable(store, {
    get paymentDescriptionLabel() {
      const {selectedPayment: {details: {description}}} = store;
      return description.trim() || 'No description';
    },
    get paymentTimeLabel() {
      return formatDate(store.selectedPayment.timestamp);
    },
    get paymentStatusLabel() {
      const {selectedPayment: {status}} = store;
      return status.charAt(0).toUpperCase() + status.slice(1);
    },
    get paymentTypeLabel() {
      const {selectedPayment: {paymentType}} = store;
      return paymentType.charAt(0).toUpperCase() + paymentType.slice(1);
    },
    get paymentNetworkLabel() {
      const {selectedPayment: {details: {type}}} = store;
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
    get paymentAmountFiatLabel() {
      const {settings, selectedPayment: {amountSat, feesSat, paymentType}} = store;
      const amount = paymentType === PaymentType.RECEIVE ?
        amountSat + feesSat : amountSat;
      return toFiatLabel(amount, settings);
    },
    get paymentAmountSatLabel() {
      const {amountSat, feesSat, paymentType} = store.selectedPayment;
      const amount = paymentType === PaymentType.RECEIVE ?
        amountSat + feesSat : amountSat;
      return toSatLabel(amount);
    },
    get paymentFeeFiatLabel() {
      const {settings, selectedPayment: {feesSat}} = store;
      return toFiatLabel(feesSat || 0, settings);
    },
    get paymentFeeSatLabel() {
      return toSatLabel(store.selectedPayment.feesSat);
    },
    get paymentTotalFiatLabel() {
      const {settings, selectedPayment: {amountSat, feesSat, paymentType}} = store;
      const total = paymentType === PaymentType.RECEIVE ?
        amountSat : amountSat + feesSat;
      return toFiatLabel(total, settings);
    },
    get paymentTotalSatLabel() {
      const {amountSat, feesSat, paymentType} = store.selectedPayment;
      const total = paymentType === PaymentType.RECEIVE ?
        amountSat : amountSat + feesSat;
      return toSatLabel(total);
    },
  });
};

export default ComputedPayment;
