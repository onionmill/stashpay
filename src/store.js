import {observable} from 'mobx';
import ComputedSend from './computed/send';
import ComputedWallet from './computed/wallet';
import ComputedReceive from './computed/receive';
import ComputedPayment from './computed/payment';

import {version, dependencies} from '../package.json';

const store = observable({
  // app state
  navReady: false,
  mnemonic: null,
  walletReady: false,
  liquidConnected: false,
  liquidListenerId: null,
  balance: null,
  balancePendingSend: null,
  balancePendingReceive: null,
  balanceRefreshing: false,
  balanceFetched: false,
  payments: [],
  selectedPayment: null,
  refundables: [],
  refundAddress: null,

  // screens
  restore: {
    mnemonic: '',
  },
  receive: {
    amount: '',
    invoice: null,
    feesSat: null,
    description: '',
    unified: true,
    onChain: false,
    minSatLn: 100,
    maxSatLn: 25_000_000,
    minSatBtc: 25_000,
    maxSatBtc: 25_000_000,
  },
  receiveEvent: {
    pendingSwaps: [],
    amountSat: null,
    feesSat: null,
  },
  send: {
    rawUri: '',
    input: null,
    amount: '',
    prepareResponse: null,
    feesSat: null,
    description: null,
    minSatLn: 21,
    maxSatLn: 25_000_000,
    minSatBtc: 25_000,
    maxSatBtc: 25_000_000,
    processing: false,
  },

  // wallet config
  config: {
    electrumLiquid: 'elements-mainnet.blockstream.info:50002',
    electrumBitcoin: 'bitcoin-mainnet.blockstream.info:50002',
    syncServiceUrl: null,
    feeFlex: 100,
    explorer: 'https://liquid.network',
    appVersion: version,
    sdkVersion: dependencies['@breeztech/react-native-breez-sdk-liquid'],
  },

  // persistent app settings
  settings: {
    unit: 'sat',
    fiat: 'usd',
    displayFiat: true,
    exchangeRate: {},
  },
});

ComputedSend(store);
ComputedWallet(store);
ComputedReceive(store);
ComputedPayment(store);

export default store;
