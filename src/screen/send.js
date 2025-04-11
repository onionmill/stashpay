import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {observer} from 'mobx-react';

import {color} from '../component/style';
import {Title} from '../component/text';
import {Header} from '../component/layout';
import {BigButton, IconButton, BackButton} from '../component/button';
import {QRCodeScanner} from '../component/qrcode-scanner';

import store from '../store';
import * as nav from '../action/nav';
import * as send from '../action/send';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  safeHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: color.white,
  },
  safeContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btn: {
    margin: 24,
  },
});

const SendAddressScreen = ({navigation}) => {
  React.useEffect(
    () => navigation.addListener('focus', () => send.initSendAddress()),
    [navigation],
  );
  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.safeContent}>
        <QRCodeScanner
          style={StyleSheet.absoluteFill}
          onCodeScanned={(data) => send.readQRCode(data)}
        />
        <BigButton
          style={styles.btn}
          processing={store.send.processing}
          onPress={() => send.pasteInvoice()}>
          Paste Address
        </BigButton>
      </SafeAreaView>
      <SafeAreaView style={styles.safeHeader}>
        <Header>
          <BackButton onPress={() => nav.goBack()} />
          <Title>Send</Title>
          <IconButton
            iconName={'at-sign'}
            onPress={() => nav.goTo('SendAddress')}
          />
        </Header>
      </SafeAreaView>
    </View>
  );
};

export default observer(SendAddressScreen);
