import {KeyBackup} from '@photon-sdk/photon-lib';

import store from '../store';
import * as nav from './nav';
import * as alert from './alert';
import * as backup from './backup';

//
// Init
//

export async function fetchUserIds() {
  store.settings.email = await KeyBackup.getEmail();
}

//
// Email Set screen
//

export function initEmailSet() {
  store.userId.email = '';
  nav.goTo('EmailSetStack');
}

export function setEmail(email) {
  store.userId.email = email;
}

//
// Email Pin screen
//

export function initPinSet() {
  store.userId.pin = '';
  nav.goTo('EmailPin');
}

export function setPin(pin) {
  store.userId.pin = pin;
}

export async function validateEmailPin() {
  try {
    initEmailVerify();
    const {email, pin} = store.userId;
    await KeyBackup.registerEmail({userId: email, pin});
  } catch (err) {
    initPinSet();
    alert.error({err});
  }
}

//
// Email Verify screen
//

export function initEmailVerify() {
  store.userId.code = '';
  nav.goTo('EmailVerify', {
    onNext: validateEmailCode,
  });
}

export function setCode(code) {
  store.userId.code = code;
}

export async function validateEmailCode() {
  try {
    nav.goTo('EmailWait', {
      message: 'Verifying email...',
    });
    const {email, code} = store.userId;
    await KeyBackup.verifyEmail({userId: email, code});
    await fetchUserIds();
    nav.goTo('Settings');
  } catch (err) {
    initEmailVerify();
    alert.error({err});
  }
}

//
// Restore screen
//

export async function initPinReset() {
  try {
    nav.goTo('RestoreWait', {
      message: 'Starting PIN reset...',
    });
    store.userId.email = await KeyBackup.getEmail();
    if (!store.userId.email) {
      backup.initRestore();
      return alert.info('PIN Reset Failed', 'No recovery email address.');
    }
    await KeyBackup.initPinReset({userId: store.userId.email});
    initPinResetCode();
  } catch (err) {
    backup.initRestore();
    alert.error({err});
  }
}

//
// Pin Reset Verify screen
//

export function initPinResetCode() {
  store.userId.code = '';
  nav.goTo('RestorePinResetCode', {
    onNext: initPinResetNewPin,
  });
}

export function initPinResetNewPin() {
  store.backup.newPin = '';
  nav.goTo('RestorePinResetNewPin', {
    onNext: validatePinResetNewPin,
  });
}

export async function validatePinResetNewPin() {
  const {newPin} = store.backup;
  if (!newPin || newPin.length < 4) {
    return alert.error({message: 'PIN must be at least 4 digits!'});
  }
  initPinResetPinVerify();
}

export function initPinResetPinVerify() {
  store.backup.pinVerify = '';
  nav.goTo('RestorePinResetPinVerify', {
    onNext: verifyPinReset,
  });
}

export async function verifyPinReset() {
  const {newPin, pinVerify} = store.backup;
  const {email: userId, code} = store.userId;
  if (newPin !== pinVerify) {
    return alert.error({message: "PINs don't match!"});
  }
  try {
    nav.goTo('RestoreWait', {
      message: 'Verifying PIN reset...',
    });
    const delay = await KeyBackup.verifyPinReset({userId, code, newPin});
    backup.initRestore();
    if (delay) {
      alert.info(
        'PIN Reset Initialized',
        `For your security PIN reset is locked until ${new Date(delay)}.`,
      );
    } else {
      alert.info(
        'PIN Reset Successful',
        'You can now use your new PIN to restore your wallet.',
      );
    }
  } catch (err) {
    backup.initRestore();
    alert.error({err});
  }
}
