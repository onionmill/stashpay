import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {PillButton} from '../component/button';
import {QRCodeScanner} from '../component/qrcode-scanner';

import * as send from '../action/send';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 25,
  },
});

const SendAddressScreen = ({navigation}) => {
  React.useEffect(
    () => navigation.addListener('focus', () => send.initSendAddress()),
    [navigation],
  );
  return (
    <View style={styles.wrapper}>
      <QRCodeScanner
        style={StyleSheet.absoluteFill}
        onCodeScanned={(data) => send.readQRCode(data)}
      />
      <PillButton onPress={() => send.pasteInvoice()}>Paste Invoice</PillButton>
    </View>
  );
};

export default observer(SendAddressScreen);
