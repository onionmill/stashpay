import {KeyBackup} from '@photon-sdk/photon-lib';

import store from '../store';
import * as nav from './nav';
import * as alert from './alert';
import {saveToDisk, savePinToDisk} from './wallet';
import {generateMnemonic} from './mnemonic';
import {Platform} from 'react-native';

const platform = Platform.OS === 'ios' ? 'iCloud' : 'Google Drive';

//
// Init
//

export function init() {
  KeyBackup.init({keyServerURI: store.config.keyServer});
}

export async function authenticate() {
  try {
    await KeyBackup.authenticate({
      clientId:
        '535388410545-2qu0melfkv5n593i6nv4v9dhaa1u4vph.apps.googleusercontent.com',
    });
  } catch (err) {
    alert.error({err});
  }
}

export async function checkBackup() {
  store.backupExists = await KeyBackup.checkForExistingBackup();
  return store.backupExists;
}

//
// Pin Set screen
//

export function initBackup() {
  store.backup.pin = '';
  store.backup.pinVerify = '';
  nav.reset('Backup');
}

export function setPin(pin) {
  store.backup.pin = pin;
}

export async function validateNewPin() {
  const {pin} = store.backup;
  if (!pin || pin.length < 4) {
    return alert.error({message: 'PIN must be at least 4 digits!'});
  }
  nav.goTo('BackupPinVerify');
}

//
// Pin Check screen
//

export function setPinVerify(pin) {
  store.backup.pinVerify = pin;
}

export async function validatePinVerify() {
  const {pin, pinVerify} = store.backup;
  if (pin !== pinVerify) {
    return alert.error({message: "PINs don't match!"});
  }
  try {
    nav.goTo('BackupWait', {
      message: `Creating encrypted\n${platform} backup...`,
    });
    await _generateWalletAndBackup(pin);
    nav.reset('Main');
  } catch (err) {
    nav.goTo('BackupPinVerify');
    alert.error({err});
  }
}

async function _generateWalletAndBackup(pin) {
  // generate new wallet
  const mnemonic = await generateMnemonic();
  // cloud backup of encrypted seed
  const data = {mnemonic};
  await KeyBackup.createBackup({data, pin});
  await saveToDisk(mnemonic, pin);
}

//
// Pin Change screen
//

export function initPinChange() {
  store.backup.pin = '';
  store.backup.newPin = '';
  store.backup.pinVerify = '';
  nav.goTo('PinChange');
}

export async function validatePinChange() {
  nav.goTo('PinChangeNew', {
    onNext: validatePinChangeNew,
  });
}

export function setNewPin(newPin) {
  store.backup.newPin = newPin;
}

export async function validatePinChangeNew() {
  const {newPin} = store.backup;
  if (!newPin || newPin.length < 4) {
    return alert.error({message: 'PIN must be at least 4 digits!'});
  }
  nav.goTo('PinChangeVerify', {
    onNext: validatePinChangeVerify,
  });
}

export async function validatePinChangeVerify() {
  const {newPin, pinVerify} = store.backup;
  if (newPin !== pinVerify) {
    return alert.error({message: "PINs don't match!"});
  }
  try {
    nav.goTo('PinChangeWait', {
      message: 'Changing PIN...',
    });
    await _changePin();
    nav.goTo('Settings');
  } catch (err) {
    nav.goTo('PinChangeVerify');
    alert.error({err});
  }
}

async function _changePin() {
  const {pin, newPin} = store.backup;
  await KeyBackup.changePin({pin, newPin});
  await savePinToDisk(newPin);
}

//
// Restore screen
//

export function initRestore() {
  store.backup.pin = '';
  nav.reset('Restore');
}

export async function validatePin() {
  try {
    nav.goTo('RestoreWait', {
      message: `Restoring wallet\nfrom ${platform}...`,
    });
    await _verifyPinAndRestore();
    nav.reset('Main');
  } catch (err) {
    nav.goTo('RestorePin');
    if (err.delay) {
      alert.error({
        title: 'Rate limit hit',
        message: `Wallet restore locked until ${new Date(err.delay)}.`,
      });
    } else {
      alert.error({message: 'Invalid PIN'});
    }
  }
}

async function _verifyPinAndRestore() {
  const {pin} = store.backup;
  // fetch encryption key and decrypt cloud backup
  const {mnemonic} = await KeyBackup.restoreBackup({pin});
  await saveToDisk(mnemonic, pin);
}
