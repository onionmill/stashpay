import {when, configure} from 'mobx';

import store from '../store';
import * as nav from './nav';
import * as wallet from './wallet';

configure({enforceActions: 'never'}); // disable strict mode

when(
  () => store.navReady,
  async () => {
    await wallet.init();
  },
);

when(
  () => store.balanceFetched,
  () => {
    nav.reset('Main');
  },
);

when(
  () => store.walletReady,
  async () => {
    await Promise.all([wallet.initLiquidClient()]);
  },
);
