import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '../component/text';
import {QRCode} from '../component/qrcode';
import {PillButton} from '../component/button';
import {LargeSpinner} from '../component/spinner';
import {font} from '../component/style';

import store from '../store';
import {formatNumber} from '../util';
import * as receive from '../action/receive';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  codeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feeText: {
    marginTop: 20,
    fontSize: font.sizeSub,
    lineHeight: font.lineHeightSub,
  },
});

const ReceiveScreen = ({navigation}) => {
  React.useEffect(
    () => navigation.addListener('focus', () => receive.fetchInvoice()),
    [navigation],
  );
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.wrapper}>
        {store.receive.invoice ? <Address /> : <LargeSpinner />}
      </View>
    </SafeAreaView>
  );
};

const Address = () => (
  <View>
    <View style={styles.codeWrapper}>
      <QRCode size={260}>{store.receive.invoice}</QRCode>
      <Text style={styles.feeText} numberOfLines={1}>
        Fee to receive: {formatNumber(store.receive.feesSat)} sats
      </Text>
    </View>
    <PillButton onPress={() => receive.copyInvoice()}>
      {store.receiveCopyBtnLabel}
    </PillButton>
  </View>
);

export default observer(ReceiveScreen);
