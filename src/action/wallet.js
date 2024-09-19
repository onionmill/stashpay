import {DevSettings} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import store from '../store';
import * as nav from './nav';
import * as alert from './alert';
import * as keychain from './keychain';
import * as storage from './local-storage';
import {generateMnemonic, validateMnemonic} from './mnemonic';
import {nap, formatNumber} from '../util';

const MNEMONIC_KEY = 'photon.mnemonic';
const INFO_KEY = 'info';
const PAYMENTS_KEY = 'payments';

//
// Init and startup
//

export async function init() {
  try {
    const hasWallet = await _getSeedFromKeychain();
    if (hasWallet) {
      await _loadBalance();
      await _loadPayments();
    } else {
      await _generateSeedAndSaveToKeychain();
    }
  } catch (err) {
    alert.error({err});
  }
}

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

export async function initLiquidClient() {
  try {
    const mnemonic = await keychain.getItem(MNEMONIC_KEY);
    const config = await liquid.defaultConfig(liquid.LiquidNetwork.MAINNET);
    await liquid.connect({mnemonic, config});
    console.log('Liquid wallet connected');
    const onEvent = e => {
      console.log(`Received event: ${e.type}`);
      update();
    };
    store.liquidListenerId = await liquid.addEventListener(onEvent);
    // const onLogEntry = (l: LogEntry) => {
    //   console.log(`Received log [${l.level}]: ${l.line}`);
    // };
    // const subscription = await liquid.setLogger(onLogEntry);
    store.liquidConnected = true;
  } catch (err) {
    console.error(err);
  }
}

//
// Wallet usage apis
//

async function _loadBalance() {
  const info = await storage.getItem(INFO_KEY);
  console.log(`Cached info: ${JSON.stringify(info)}`);
  if (!info) {
    store.balance = null;
    return;
  }
  store.balance = info.balanceSat + info.pendingReceiveSat || null;
}

export async function fetchBalance() {
  try {
    const info = await liquid.getInfo();
    if (!info) {
      store.balance = null;
      return;
    }
    console.log(`Wallet balance: ${info.balanceSat}`);
    console.log(`Wallet pending send balance: ${info.pendingSendSat}`);
    console.log(`Wallet pending receive balance: ${info.pendingReceiveSat}`);
    if (info.pendingReceiveSat) {
      const oldInfo = await storage.getItem(INFO_KEY);
      if (!oldInfo || !oldInfo.pendingReceiveSat) {
        nav.goTo('ReceiveSuccess',{
          valueLabel: formatNumber(info.pendingReceiveSat),
        });
      }
    }
    await storage.setItem(INFO_KEY, info);
    console.log(`Storing info: ${JSON.stringify(info)}`);
    store.balance = info.balanceSat + info.pendingReceiveSat || null;
  } catch (err) {
    console.error(err);
  }
}

export async function _loadPayments() {
  try {
    const payments = await storage.getItem(PAYMENTS_KEY);
    console.log(`Cached payments: ${payments && payments.length}`);
    if (!payments) {
      return;
    }
    store.payments = payments;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchPayments() {
  try {
    const payments = await liquid.listPayments({});
    await storage.setItem(PAYMENTS_KEY, payments);
    console.log(`Storing payments: ${payments.length}`);
    store.payments = payments;
    // console.log(JSON.stringify(payments, null, '  '))
  } catch (err) {
    console.error(err);
  }
}

export async function update() {
  store.balanceRefreshing = true;
  while (!store.walletReady || !store.liquidConnected) {
    await nap(100);
  }
  await fetchBalance();
  await fetchPayments();
  store.balanceRefreshing = false;
}

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
    message: 'This will overwrite the app storage and restart. Make sure your wallet is backed up before or you will lose access to your funds.',
    onOk: () => _importMnemonicAndRestart(),
    okText: 'Import',
    destructive: true,
  });
}

export async function _importMnemonicAndRestart() {
  try {
    const mnemonic = store.restore.mnemonic.trim();
    if (!validateMnemonic(mnemonic)) {
      throw Error('Invalid seed words');
    }
    await keychain.setItem(MNEMONIC_KEY, mnemonic);
    await _resetStorage();
    Clipboard.setString('');
    DevSettings.reload();
  } catch (err) {
    alert.error({err});
  }
}

//
// Logout and cleanup
//

export async function logout() {
  alert.confirm({
    title: 'Warning',
    message: 'This will delete the app storage and restart. Make sure your wallet is backed up before or you will lose access to your funds.',
    onOk: () => _wipeAndRestart(),
    okText: 'Logout',
    destructive: true,
  });
}

export async function _wipeAndRestart() {
  try {
    await _stopLiquidClient();
    await _wipeCache();
    DevSettings.reload();
  } catch (err) {
    console.error(err);
  }
}

async function _stopLiquidClient() {
  await liquid.removeEventListener(store.liquidListenerId);
  await liquid.disconnect();
  store.liquidConnected = false;
}

async function _wipeCache() {
  store.walletReady = false;
  await _generateSeedAndSaveToKeychain();
}

async function _resetStorage() {
  store.mnemonic = null;
  store.balance = null;
  store.payments = [];
  await storage.removeItem(INFO_KEY);
  await storage.removeItem(PAYMENTS_KEY);
}
