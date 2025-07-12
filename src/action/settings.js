import {action} from 'mobx';

import store from '../store';
import * as log from './log';
import * as storage from './local-storage';

const UNIFIED_QR_KEY = 'unified_qr';

export const init = action(async () => {
  try {
    await _loadUnifiedQR();
  } catch (err) {
    alert.error({err});
  }
});

const _loadUnifiedQR = async () => {
  const saved = await storage.getItem(UNIFIED_QR_KEY);
  log.trace(`Loaded unified qr setting: ${saved}`);
  if (saved === null) {
    return;
  }
  store.receive.unified = saved;
};

export async function setUnifiedQR(value) {
  try {
    store.receive.unified = value;
    await storage.setItem(UNIFIED_QR_KEY, value);
    log.trace(`Stored unified qr setting: ${value}`);
  } catch (err) {
    alert.error({err});
  }
}
