import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {observer} from 'mobx-react';

import {PillButton} from '../component/button';
import {QRCodeScanner} from '../component/qrcode-scanner';

import * as send from '../action/send';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btn: {
    margin: 20,
  },
});

const SendAddressScreen = ({navigation}) => {
  React.useEffect(
    () => navigation.addListener('focus', () => send.initSendAddress()),
    [navigation],
  );
  return (
    <SafeAreaView style={styles.safe}>
      <QRCodeScanner
        style={StyleSheet.absoluteFill}
        onCodeScanned={(data) => send.readQRCode(data)}
      />
      <PillButton
        style={styles.btn}
        onPress={() => send.pasteInvoice()}
      >
        Paste Address<
      /PillButton>
    </SafeAreaView>
  );
};

export default observer(SendAddressScreen);
