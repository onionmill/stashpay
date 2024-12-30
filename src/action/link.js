import {Linking} from 'react-native';

import {nap} from '../util';
import store from '../store';
import * as nav from './nav';
import * as log from './log';
import * as send from './send';

export async function listenForUrl() {
  Linking.addEventListener('url', ({ url }) => _openUrl(url));
  const url = await Linking.getInitialURL();
  if (!url) {
    nav.reset('Main');
    return;
  }
  while (!store.walletReady || !store.liquidConnected) {
    await nap(100);
  }
  nav.reset('Main');
  await _openUrl(url);
}

async function _openUrl(url) {
  log.trace(`Incoming link: ${url}`);
  send.initSendAddress();
  send.setUri(url);
  await send.parseUri();
}
