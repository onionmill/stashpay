import {observable} from 'mobx';
import ComputedSend from './computed/send';
import ComputedWallet from './computed/wallet';

const store = observable({
  // app state
  navReady: false,
  backupExists: null,
  walletReady: false,
  electrumConnected: false,
  xpub: null,
  balance: null,
  balanceRefreshing: false,
  transactions: [],
  nextAddress: null,
  cosigners: [],

  // screens
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
    address: null,
    newTx: {},
  },

  // Persistent data
  config: {
    electrum: {
      host: 'electrum1.bluewallet.io',
      tcp: null,
      ssl: '443',
    },
    keyServer: 'https://keys-dev.photonsdk.com',
  },
});

ComputedSend(store);
ComputedWallet(store);

export default store;
