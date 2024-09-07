import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {observer} from 'mobx-react';

import {ArrowUpButton} from '../component/button';

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
    <ArrowUpButton style={styles.listBtn} onPress={() => nav.goTo('PaymentList')} />
  </View>
);

const balanceStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 30,
  },
  numeral: {
    marginTop: 10,
    fontSize: 50,
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

export default observer(WalletScreen);
