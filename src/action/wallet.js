import {DevSettings} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import * as liquid from '@breeztech/react-native-breez-sdk-liquid';

import store from '../store';
import * as nav from './nav';
import * as alert from './alert';
import * as keychain from './keychain';
import {validateMnemonic} from './mnemonic';
import {nap} from '../util';

const PIN_KEY = 'photon.pin';
const MNEMONIC_KEY = 'photon.mnemonic';

//
// Init and startup
//

export async function savePinToDisk(pin) {
  await keychain.setItem(PIN_KEY, pin);
}

export async function saveToDisk(mnemonic, pin) {
  if (!validateMnemonic(mnemonic)) {
    throw Error('Cannot validate mnemonic');
  }
  await savePinToDisk(pin);
  await keychain.setItem(MNEMONIC_KEY, mnemonic);
  store.walletReady = true;
}

export async function loadFromDisk() {
  try {
    const mnemonic = await keychain.getItem(MNEMONIC_KEY);
    store.walletReady = validateMnemonic(mnemonic);
    return store.walletReady;
  } catch (err) {
    console.error(err);
  }
}

export async function checkPin() {
  try {
    const {pin} = store.backup;
    const storedPin = await keychain.getItem(PIN_KEY);
    if (storedPin === pin) {
      nav.reset('Main');
    } else {
      alert.error({message: 'Invalid PIN'});
    }
  } catch (err) {
    console.error(err);
  }
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
    store.balance = info.balanceSat + info.pendingReceiveSat || null;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchTransactions() {
  try {
    store.transactions = await liquid.listPayments({});
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
  // await fetchTransactions();
  store.balanceRefreshing = false;
}

//
// Receive address handling
//

export function copyAddress() {
  Clipboard.setString(store.nextAddress);
}

export async function fetchNextAddress() {
  store.nextAddress = null;
  while (!store.liquidConnected) {
    await nap(100);
  }

  // Set the amount you wish the payer to send, which should be within the above limits
  const prepareRes = await liquid.prepareReceivePayment({
    payerAmountSat: 1_000,
  });

  // If the fees are acceptable, continue to create the Receive Payment
  const receiveFeesSat = prepareRes.feesSat;
  console.log(`Receive fees, in sats: ${receiveFeesSat}`);

  const optionalDescription = '<description>';
  const res = await liquid.receivePayment({
    prepareRes,
    description: optionalDescription,
  });

  const invoice = res.invoice;
  console.log(`Invoice: ${invoice}`);

  store.nextAddress = invoice;
}

//
// Logout and cleanup
//

export async function logout() {
  alert.confirm({
    title: 'Logout',
    message: 'Wipe app storage and restart?',
    onOk: () => _wipeAndRestart(),
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
  store.liquidConnected = false;
}

async function _wipeCache() {
  await keychain.setItem(MNEMONIC_KEY, null);
  await keychain.setItem(PIN_KEY, null);
  store.walletReady = false;
}
