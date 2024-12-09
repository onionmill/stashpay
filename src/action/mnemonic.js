const {NativeModules} = require('react-native');
const {RNRandomBytes} = NativeModules;
import * as bip39 from 'bip39';

async function randomBytes(size) {
  return new Promise((resolve, reject) => {
    RNRandomBytes.randomBytes(size, (err, bytes) => {
      if (err) {
        reject(err);
      } else {
        // eslint-disable-next-line no-undef
        resolve(Buffer.from(bytes, 'base64'));
      }
    });
  });
}

export async function generateMnemonic() {
  const buf = await randomBytes(16);
  return bip39.entropyToMnemonic(buf);
}

export function validateMnemonic(secret) {
  return bip39.validateMnemonic(secret);
}
