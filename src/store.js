import {observable} from 'mobx';
import ComputedSend from './computed/send';
import ComputedWallet from './computed/wallet';

const store = observable({
  // app state
  navReady: false,
  backupExists: null,
  mnemonic: null,
  walletReady: false,
  liquidConnected: false,
  liquidListenerId: null,
  xpub: null,
  balance: null,
  balanceRefreshing: false,
  transactions: [],
  nextAddress: null,
  cosigners: [],

  // screens
  restore: {
    mnemonic: '',
  },
  backup: {
    pin: '',
    newPin: '',
    pinVerify: '',
  },
  userId: {
    email: '',
    code: '',
    pin: '',
    delay: null,
  },
  settings: {
    email: null,
  },
  send: {
    value: null,
    feeRate: '2',
    invoice: null,
    feesSat: null,
    description: null,
  },

  // Persistent data
  config: {
    keyServer: 'https://keys-dev.photonsdk.com',
  },
});

ComputedSend(store);
ComputedWallet(store);

export default store;
