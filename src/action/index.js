import {when, configure} from 'mobx';

import store from '../store';
import * as link from './link';
import * as wallet from './wallet';
import * as receive from './receive';

configure({enforceActions: 'never'}); // disable strict mode

when(
  () => store.navReady,
  async () => {
    await wallet.init();
  },
);

when(
  () => store.balanceFetched,
  async () => {
    await link.listenForUrl();
  },
);

when(
  () => store.walletReady,
  async () => {
    await wallet.initLiquidClient();
  },
);

when(
  () => store.liquidConnected,
  async () => {
    await receive.fetchLimits();
  },
);
