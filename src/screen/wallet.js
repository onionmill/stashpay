import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '../component/text';
import {font} from '../component/style';
import {ArrowUpButton, GlasButton} from '../component/button';

import store from '../store';
import * as nav from '../action/nav';

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  listBtn: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 20,
  },
});

const WalletScreen = () => (
  <View style={styles.wrapper}>
    <Balance />
    <SendReceiveButton />
    <ArrowUpButton style={styles.listBtn} onPress={() => nav.goTo('PaymentList')} />
  </View>
);

const balanceStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: font.sizeXL,
    lineHeight: font.lineHeightXL,
  },
  numeral: {
    fontSize: font.sizeXXXL,
    lineHeight: font.lineHeightXXXL,
  },
});

const Balance = () => (
  <View style={balanceStyles.wrapper}>
    <Text style={balanceStyles.label}>Total sats</Text>
    <Text
      style={balanceStyles.numeral}
      adjustsFontSizeToFit={true}
      numberOfLines={1}>
      {store.balanceLabel}
    </Text>
  </View>
);

//
// Send Receive Button
//

const bigBtnStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginTop: 40,
  },
  leftBtn: {
    flex: 1,
    borderTopLeftRadius: 21,
    borderBottomLeftRadius: 21,
  },
  rightBtn: {
    flex: 1,
    borderTopRightRadius: 21,
    borderBottomRightRadius: 21,
  },
});

const SendReceiveButton = ({ goPay, goRequest }) => (
  <View style={bigBtnStyles.wrapper}>
    <GlasButton onPress={goRequest} style={bigBtnStyles.leftBtn}>
      Receive
    </GlasButton>
    <GlasButton onPress={goPay} style={bigBtnStyles.rightBtn}>
      Send
    </GlasButton>
  </View>
);

export default observer(WalletScreen);
