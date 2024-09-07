import {observable} from 'mobx';
import ComputedSend from './computed/send';
import ComputedWallet from './computed/wallet';

const store = observable({
  // app state
  navReady: false,
  mnemonic: null,
  walletReady: false,
  liquidConnected: false,
  liquidListenerId: null,
  balance: null,
  balanceRefreshing: false,
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
  },
  send: {
    value: null,
    destination: null,
    feesSat: null,
    description: null,
  },

  // Persistent data
  config: {},
});

ComputedSend(store);
ComputedWallet(store);

export default store;
