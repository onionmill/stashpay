import {action} from 'mobx';
import Clipboard from '@react-native-clipboard/clipboard';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';
import {breezApiKey} from '../../breez-api-key.json';

import store from '../store';
import * as log from './log';
import * as nav from './nav';
import * as alert from './alert';
import * as keychain from './keychain';
import * as storage from './local-storage';
import {generateMnemonic, validateMnemonic} from './mnemonic';
import {loadPayments, fetchPayments, deletePayments} from './payment';
import {nap, formatNumber} from '../util';

const MNEMONIC_KEY = 'photon.mnemonic';
const INFO_KEY = 'info';

//
// Init and startup
//

export const init = action(async () => {
  try {
    log.info(`Running version ${store.config.appVersion} (SDK ${store.config.sdkVersion})`);
    const hasWallet = await _getSeedFromKeychain();
    if (hasWallet) {
      await _loadBalance();
      await loadPayments();
    } else {
      await _generateSeedAndSaveToKeychain();
    }
  } catch (err) {
    alert.error({err});
  }
});

async function _getSeedFromKeychain() {
  const mnemonic = await keychain.getItem(MNEMONIC_KEY);
  store.walletReady = validateMnemonic(mnemonic);
  store.mnemonic = mnemonic;
  return store.walletReady;
}

async function _generateSeedAndSaveToKeychain() {
  const mnemonic = await generateMnemonic();
  if (!validateMnemonic(mnemonic)) {
    throw Error('Generated invalid seed!');
  }
  await keychain.setItem(MNEMONIC_KEY, mnemonic);
  await _resetStorage();
  await _getSeedFromKeychain();
}

export const initLiquidClient = action(async () => {
  try {
    if (store.liquidConnected) {
      return;
    }
    log.info('Liquid wallet connecting...');
    await liquid.setLogger(l => log.logSDK(l));
    const mnemonic = await keychain.getItem(MNEMONIC_KEY);
    const config = await liquid.defaultConfig(liquid.LiquidNetwork.MAINNET, breezApiKey);
    config.liquidElectrumUrl = store.config.electrumLiquid;
    config.bitcoinElectrumUrl = store.config.electrumBitcoin;
    await liquid.connect({mnemonic, config});
    log.info('Liquid wallet connected!');
    const onEvent = action(async e => {
      log.trace(`Received event: ${e.type}`);
      await update();
    });
    store.liquidListenerId = await liquid.addEventListener(onEvent);
    store.liquidConnected = true;
  } catch (err) {
    log.error(err);
  }
});

//
// Wallet usage apis
//

async function _loadBalance() {
  const info = await storage.getItem(INFO_KEY);
  log.trace(`Cached info: ${JSON.stringify(info)}`);
  if (!info) {
    store.balance = null;
    return;
  }
  _updateBalance(info);
}

export async function fetchBalance() {
  try {
    const info = await liquid.getInfo();
    if (!info) {
      store.balance = null;
      return;
    }
    log.trace(`Wallet balance: ${info.balanceSat}`);
    log.trace(`Wallet pending send balance: ${info.pendingSendSat}`);
    log.trace(`Wallet pending receive balance: ${info.pendingReceiveSat}`);
    const oldInfo = await storage.getItem(INFO_KEY);
    _displayReceiveMessage(oldInfo, info);
    await storage.setItem(INFO_KEY, info);
    log.trace(`Storing info: ${JSON.stringify(info)}`);
    _updateBalance(info);
  } catch (err) {
    log.error(err);
  }
}

function _displayReceiveMessage(oldInfo, info) {
  if (oldInfo && _totalBalance(oldInfo) < _totalBalance(info)) {
    // handle direct liquid payment
    nav.goTo('ReceiveSuccess',{
      valueLabel: formatNumber(_totalBalance(info) - _totalBalance(oldInfo)),
    });
  } else if (info.pendingReceiveSat) {
    // handle lightning/swap payment
    if (!oldInfo || !oldInfo.pendingReceiveSat) {
      nav.goTo('ReceiveSuccess',{
        valueLabel: formatNumber(info.pendingReceiveSat),
      });
    }
  }
}

const _totalBalance = info => info.balanceSat + info.pendingReceiveSat;

const _updateBalance = action(info => {
    store.balance = _totalBalance(info) || null;
    store.balanceFetched = true;
});

export const update = action(async () => {
  store.balanceRefreshing = true;
  while (!store.walletReady || !store.liquidConnected) {
    await nap(100);
  }
  await fetchBalance();
  await fetchPayments();
  store.balanceRefreshing = false;
});

//
// Seed backup and restore
//

export function copyMnemonic() {
  Clipboard.setString(store.mnemonic);
  alert.warn({
    title: 'Careful now!',
    message: 'Paste the recovery phrase into your password manager. Then come back to this app and press to empty the clipboard.',
    onOk: () => Clipboard.setString(''),
    okText: 'Empty Clipboard',
  });
}

export function initSeedBackup() {
  nav.goTo('SeedBackupStack');
}

export function initSeedRestore() {
  store.restore.mnemonic = '';
  nav.goTo('SeedRestoreStack');
}

export function setMnemonic(mnemonic) {
  store.restore.mnemonic = mnemonic;
}

export async function importMnemonic() {
  alert.confirm({
    title: 'Warning',
    message: 'This will overwrite the app storage. Make sure your wallet is backed up before or you will lose access to your funds.',
    onOk: () => _importMnemonicAndRestart(),
    okText: 'Import',
    destructive: true,
  });
}

const _importMnemonicAndRestart = action(async () => {
  try {
    const mnemonic = store.restore.mnemonic.trim();
    if (!validateMnemonic(mnemonic)) {
      throw Error('Invalid seed words');
    }
    await _stopLiquidClient();
    await keychain.setItem(MNEMONIC_KEY, mnemonic);
    await _resetStorage();
    Clipboard.setString('');
    await _reloadWallet();
  } catch (err) {
    alert.error({err});
  }
});

//
// Logout and cleanup
//

export async function logout() {
  alert.confirm({
    title: 'Warning',
    message: 'This will delete the app storage and generate a new wallet. Make sure your wallet is backed up before or you will lose access to your funds.',
    onOk: () => _wipeAndRestart(),
    okText: 'Logout',
    destructive: true,
  });
}

const _wipeAndRestart = action(async () => {
  try {
    await _stopLiquidClient();
    await _wipeCache();
    await _reloadWallet();
  } catch (err) {
    log.error(err);
  }
});

async function _reloadWallet() {
  nav.reset('Splash');
  await init();
  await initLiquidClient();
  while (!store.balanceFetched) {
    await nap(100);
  }
  nav.reset('Main');
}

async function _stopLiquidClient() {
  await liquid.removeEventListener(store.liquidListenerId);
  await liquid.disconnect();
  store.liquidListenerId = null;
  store.liquidConnected = false;
}

async function _wipeCache() {
  store.walletReady = false;
  await _generateSeedAndSaveToKeychain();
}

async function _resetStorage() {
  store.mnemonic = null;
  store.balance = null;
  store.balanceFetched = false;
  store.payments = [];
  await storage.removeItem(INFO_KEY);
  await deletePayments();
  await log.deleteLogFile();
}
