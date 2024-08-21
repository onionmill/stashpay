import {when, configure} from 'mobx';

import store from '../store';
import * as nav from './nav';
import * as wallet from './wallet';
import * as backup from './backup';
import * as userId from './user-id';

configure({enforceActions: 'never'}); // disable strict mode

when(
  () => store.navReady,
  async () => {
    backup.init();
    const hasWallet = await wallet.loadFromDisk();
    if (hasWallet) {
      nav.reset('Main');
      return;
    }
    await backup.authenticate();
    const hasBackup = await backup.checkBackup();
    if (!hasBackup) {
      backup.initBackup();
    } else {
      backup.initRestore();
    }
  },
);

when(
  () => store.walletReady,
  async () => {
    await Promise.all([wallet.initLiquidClient(), userId.fetchUserIds()]);
  },
);
