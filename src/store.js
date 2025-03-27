import {observable} from 'mobx';
import ComputedSend from './computed/send';
import ComputedWallet from './computed/wallet';
import ComputedReceive from './computed/receive';

import {version, dependencies} from '../package.json';

const store = observable({
  // app state
  navReady: false,
  mnemonic: null,
  walletReady: false,
  liquidConnected: false,
  liquidListenerId: null,
  balance: null,
  balanceRefreshing: false,
  balanceFetched: false,
  payments: [],
  refundables: [],
  refundAddress: null,

  // screens
  restore: {
    mnemonic: '',
  },
  receive: {
    value: null,
    invoice: null,
    feesSat: null,
    description: null,
    onChain: false,
    minSatLn: 1_000,
    minSatBtc: 25_000,
  },
  send: {
    rawUri: null,
    input: null,
    value: null,
    prepareResponse: null,
    feesSat: null,
    description: null,
    minSatLn: 1_000,
    minSatBtc: 25_000,
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

export default store;
