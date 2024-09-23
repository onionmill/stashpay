import RNFS from 'react-native-fs';
import RNShare from 'react-native-share';

import * as alert from './alert';

const LOG_FILE_PATH = RNFS.DocumentDirectoryPath + '/wallet-log.log';
const LOL_LEVEL = ['ERROR', 'WARN', 'INFO', 'DEBUG']; // 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'

export async function appendLogFile(logEntry) {
  if (!LOL_LEVEL.includes(logEntry.level)) {
    return;
  }
  const line = `${new Date().toISOString()} [${logEntry.level}]: ${logEntry.line}\n`;
  RNFS.appendFile(LOG_FILE_PATH, line, 'utf8');
  // if (!['ERROR', 'WARN', 'INFO'].includes(logEntry.level)) {
  //   return;
  // }
  // console.log(line)
}

export async function exportLogFile() {
  try {
    await _exportLogFile();
    alert.info('Success', 'Log file exported!');
  } catch (err) {
    alert.error({err});
  }
}

async function _exportLogFile() {
  await RNShare.open({
    url: `file://${LOG_FILE_PATH}`,
    type: 'text/plain',
  });
}
