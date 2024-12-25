const {NativeModules} = require('react-native');
import * as bip39 from 'bip39';

function randomBytes(size) {
  const bytes = NativeModules.RNGetRandomValues.getRandomBase64(size);
  // eslint-disable-next-line no-undef
  return Buffer.from(bytes, 'base64');
}

export async function generateMnemonic() {
  const buf = randomBytes(16);
  return bip39.entropyToMnemonic(buf);
}

export function validateMnemonic(secret) {
  return bip39.validateMnemonic(secret);
}
