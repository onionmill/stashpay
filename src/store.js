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
  transactions: [],
  nextAddress: null,

  // screens
  restore: {
    mnemonic: '',
  },
  send: {
    value: null,
    feeRate: '2',
    invoice: null,
    feesSat: null,
    description: null,
  },

  // Persistent data
  config: {},
});

ComputedSend(store);
ComputedWallet(store);

export default store;
