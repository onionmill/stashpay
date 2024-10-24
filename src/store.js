import {observable} from 'mobx';
import ComputedSend from './computed/send';
import ComputedWallet from './computed/wallet';
import ComputedReceive from './computed/receive';

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
    minSatBtc: 50000,
  },
  send: {
    rawUri: null,
    input: null,
    value: null,
    destination: null,
    feesSat: null,
    description: null,
    minSatLn: 1000,
    minSatBtc: 50000,
  },

  // persistent data
  config: {
    breezApiKey: '',
  },
});

ComputedSend(store);
ComputedWallet(store);
ComputedReceive(store);

export default store;
