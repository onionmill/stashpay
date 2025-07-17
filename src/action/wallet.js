import {action} from 'mobx';
import Clipboard from '@react-native-clipboard/clipboard';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import store from '../store';
import * as log from './log';
import * as nav from './nav';
import * as alert from './alert';
import * as keychain from './keychain';
import * as storage from './local-storage';
import {generateMnemonic, validateMnemonic} from './mnemonic';
import {loadPayments, fetchPayments, deletePayments} from './payment';
import {nap} from '../util';

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
    const config = await liquid.defaultConfig(liquid.LiquidNetwork.MAINNET);
    config.liquidExplorer = {
      type: liquid.BlockchainExplorerVariant.ELECTRUM,
      url: store.config.electrumLiquid,
    };
    config.bitcoinExplorer = {
      type: liquid.BlockchainExplorerVariant.ELECTRUM,
      url: store.config.electrumBitcoin,
    };
    config.syncServiceUrl = store.config.syncServiceUrl;
    config.onchainFeeRateLeewaySat = store.config.feeFlex;
    await liquid.connect({mnemonic, config});
    log.info('Liquid wallet connected!');
    store.liquidListenerId = await liquid.addEventListener(_onEvent);
    store.liquidConnected = true;
  } catch (err) {
    log.error(err);
  }
});

const _onEvent = action(async e => {
  log.trace(`Received event: ${e.type}`);
  e.details && log.trace(`Payment event details: ${JSON.stringify(e.details)}`);
  // show receive notification on incoming swap
  if (
    (e.type === liquid.SdkEventVariant.PAYMENT_PENDING ||
    e.type === liquid.SdkEventVariant.PAYMENT_WAITING_CONFIRMATION ||
    e.type === liquid.SdkEventVariant.PAYMENT_SUCCEEDED) &&
    e.details.paymentType === liquid.PaymentType.RECEIVE &&
    e.details.details && e.details.details.swapId &&
    !store.receiveEvent.pendingSwaps.includes(e.details.details.swapId)
  ) {
    log.trace(`Payment event swap: ${e.details.details.swapId}`);
    store.receiveEvent.pendingSwaps.push(e.details.details.swapId);
    store.receiveEvent.amountSat = e.details.amountSat;
    store.receiveEvent.feesSat = e.details.feesSat;
    nav.goTo('ReceiveSuccess');
  }
  // remove swapId from pendingSwaps if payment succeeded
  if (
    e.type === liquid.SdkEventVariant.PAYMENT_SUCCEEDED &&
    e.details.details && e.details.details.swapId
  ) {
    const index = store.receiveEvent.pendingSwaps.indexOf(e.details.details.swapId);
    if (index > -1) {
      store.receiveEvent.pendingSwaps.splice(index, 1);
    }
  }
  // fetch updated balance and payments
  await update();
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
    const info = (await liquid.getInfo()).walletInfo;
    if (!info) {
      store.balance = null;
      return;
    }
    log.trace(`Wallet balance: ${info.balanceSat}`);
    log.trace(`Wallet pending send balance: ${info.pendingSendSat}`);
    log.trace(`Wallet pending receive balance: ${info.pendingReceiveSat}`);
    await storage.setItem(INFO_KEY, info);
    log.trace(`Storing info: ${JSON.stringify(info)}`);
    _updateBalance(info);
  } catch (err) {
    log.error(err);
  }
}

const _updateBalance = action(info => {
    store.balance = info.balanceSat;
    store.balancePendingSend = info.pendingSendSat;
    store.balancePendingReceive = info.pendingReceiveSat;
    store.balanceFetched = true;
});

export const update = action(async () => {
  while (store.balanceRefreshing) {
    await nap(100); // prevent race conditions
  }
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
