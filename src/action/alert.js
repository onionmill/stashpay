import {Alert} from 'react-native';

import * as log from './log';

export function info(title, message) {
  Alert.alert(title, message);
}

export function error({title, message, err}) {
  Alert.alert(title, message || err.message);
  if (err) {
    log.error(err);
  }
}

export function warn({title, message, onOk, okText}) {
  Alert.alert(
    title,
    message,
    [
      {
        text: okText || 'OK',
        onPress: () => onOk(),
      },
    ],
    {
      cancelable: false,
    },
  );
}

export function confirm({title, message, onOk, okText, destructive}) {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: okText || 'OK',
        style: destructive ? 'destructive' : 'default',
        onPress: () => onOk(),
      },
    ],
    {
      cancelable: true,
    },
  );
}
