import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '../component/text';
import {QRCode} from '../component/qrcode';
import {PillButton} from '../component/button';
import {LargeSpinner} from '../component/spinner';
import {font} from '../component/style';

import store from '../store';
import * as wallet from '../action/wallet';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  codeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressText: {
    marginTop: 20,
    fontSize: font.sizeSub,
    lineHeight: font.lineHeightSub,
  },
});

const ReceiveScreen = ({navigation}) => {
  React.useEffect(
    () => navigation.addListener('focus', () => wallet.fetchNextAddress()),
    [navigation],
  );
  return (
    <View style={styles.wrapper}>
      {store.nextAddress ? <Address /> : <LargeSpinner />}
    </View>
  );
};

const Address = () => (
  <View>
    <View style={styles.codeWrapper}>
      <QRCode size={260}>{store.nextAddress}</QRCode>
      <Text
        style={styles.addressText}
        adjustsFontSizeToFit={true}
        numberOfLines={1}>
        {store.nextAddress}
      </Text>
    </View>
    <PillButton onPress={() => wallet.copyAddress()}>Copy Address</PillButton>
  </View>
);

export default observer(ReceiveScreen);
