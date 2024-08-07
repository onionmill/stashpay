import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {observer} from 'mobx-react';

import {MainContent} from '../component/layout';

import store from '../store';
import * as wallet from '../action/wallet';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
});

const WalletScreen = () => (
  <MainContent
    style={styles.wrapper}
    refreshing={store.balanceRefreshing}
    onRefresh={() => wallet.update()}>
    <Balance />
  </MainContent>
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
