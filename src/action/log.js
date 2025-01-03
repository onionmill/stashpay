import RNFS from 'react-native-fs';
import RNShare from 'react-native-share';

const LOG_FILE_PATH = RNFS.DocumentDirectoryPath + '/wallet-log.txt';
const LOG_LEVEL_SDK = ['ERROR', 'WARN', 'INFO', 'DEBUG']; // 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'
const LOG_LEVEL_FILE = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
const LOG_LEVEL_DISPLAY = ['ERROR', 'WARN', 'INFO', 'TRACE'];

//
// Logging APIs
//

export async function trace(message) {
  await _logApp('TRACE', message);
}

export async function debug(message) {
  await _logApp('DEBUG', message);
}

export async function info(message) {
  await _logApp('INFO', message);
}

export async function warn(message) {
  await _logApp('WARN', message);
}

async function _logApp(level, message) {
  const line = _formatLine('APP', level, message);
  _displayLog(level, line);
  await _appendLogFile(level, line);
}

export async function error(err) {
  const level = 'ERROR';
  const line = _formatLine('APP', level, err.message);
  console.error(line, err);
  await _appendLogFile(level, line);
}

export async function logSDK(logEntry) {
  if (!LOG_LEVEL_SDK.includes(logEntry.level)) {
    return;
  }
  const line = _formatLine('SDK', logEntry.level, logEntry.line);
  _displayLog(logEntry.level, line);
  await _appendLogFile(logEntry.level, line);
}

export async function exportLogFile() {
  try {
    await RNShare.open({url: `file://${LOG_FILE_PATH}`, type: 'text/plain'});
  } catch (err) {
    console.log(_formatLine('APP', 'WARN', 'Exporting log failed!'), err);
  }
}

export async function deleteLogFile() {
  try {
    if (await RNFS.exists(LOG_FILE_PATH)) {
      await RNFS.unlink(LOG_FILE_PATH);
    }
  } catch (err) {
    console.error(_formatLine('APP', 'ERROR', 'Deleting log failed!'), err);
  }
}

//
// Helper functions
//

function _formatLine(src, level, message) {
  return `[${src}] [${level}]: ${message}`;
}

function _displayLog(level, line) {
  if (!LOG_LEVEL_DISPLAY.includes(level)) {
    return;
  }
  console.log(line);
}

async function _appendLogFile(level, line) {
  if (!LOG_LEVEL_FILE.includes(level)) {
    return;
  }
  line = `${new Date().toISOString()} ${line}\n`;
  try {
    await RNFS.appendFile(LOG_FILE_PATH, line, 'utf8');
  } catch (err) {
    console.error(_formatLine('APP', 'ERROR', 'Appending log failed!'), err);
  }
}
