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
    minSatLn: 1000,
    minSatBtc: 25000,
  },
  send: {
    rawUri: null,
    input: null,
    value: null,
    prepareResponse: null,
    feesSat: null,
    description: null,
    minSatLn: 1000,
    minSatBtc: 25000,
  },

  // persistent data
  config: {
    electrumLiquid: 'elements-mainnet.breez.technology:50002',
    electrumBitcoin: 'bitcoin-mainnet.blockstream.info:50002',
    explorer: 'https://liquid.network',
    appVersion: version,
    sdkVersion: dependencies['@breeztech/react-native-breez-sdk-liquid'],
  },
});

ComputedSend(store);
ComputedWallet(store);
ComputedReceive(store);

export default store;
