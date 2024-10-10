import RNFS from 'react-native-fs';
import RNShare from 'react-native-share';

const LOG_FILE_PATH = RNFS.DocumentDirectoryPath + '/wallet-log.txt';
const LOG_FILE_LEVEL = ['ERROR', 'WARN', 'INFO', 'DEBUG']; // 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'
const LOG_DISPAY_LEVEL = ['ERROR', 'WARN', 'INFO'];

//
// Logging APIs
//

export function debug(message) {
  const level = 'DEBUG';
  const line = _formatLine('APP', level, message);
  _displayLog(level, line);
}

export function info(message) {
  const level = 'INFO';
  const line = _formatLine('APP', level, message);
  _displayLog(level, line);
}

export function warn(message) {
  const level = 'WARN';
  const line = _formatLine('APP', level, message);
  _displayLog(level, line);
}

export async function error(err) {
  const level = 'ERROR';
  const line = _formatLine('APP', level, err.message);
  console.error(line, err);
  await _appendLogFile(level, line);
}

export async function logSDK(logEntry) {
  if (!LOG_FILE_LEVEL.includes(logEntry.level)) {
    return;
  }
  const line = _formatLine('SDK', logEntry.level, logEntry.line);
  _displayLog(logEntry.level, line);
  await _appendLogFile(logEntry.level, line);
}

export async function exportLogFile() {
  try {
    await _exportLogFile();
  } catch (err) {
    warn(err.message);
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

export function _displayLog(level, line) {
  if (!LOG_DISPAY_LEVEL.includes(level)) {
    return;
  }
  console.log(line);
}

async function _appendLogFile(level, line) {
  if (!LOG_FILE_LEVEL.includes(level)) {
    return;
  }
  line = `${new Date().toISOString()} ${line}\n`;
  await RNFS.appendFile(LOG_FILE_PATH, line, 'utf8');
}

async function _exportLogFile() {
  await RNShare.open({
    url: `file://${LOG_FILE_PATH}`,
    type: 'text/plain',
  });
}
