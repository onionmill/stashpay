import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {AmountInput} from '../component/input';
import {PillButton} from '../component/button';
import {MainContent} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import * as receive from '../action/receive';

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  btnWrapper: {
    marginTop: 20,
    height: 150,
  },
});

const ReceiveAmountScreen = () => (
  <Background style={styles.wrapper}>
    <MainContent>
      <AmountInput
        placeholder={store.receiveMinValueLabel}
        keyboardType="number-pad"
        autoFocus
        style={styles.input}
        value={store.receive.value}
        onChangeText={value => receive.setAmount(value)}
      />
      <View style={styles.btnWrapper}>
        <PillButton onPress={() => nav.goTo('Receive')}>Request Amount</PillButton>
      </View>
    </MainContent>
  </Background>
);

export default observer(ReceiveAmountScreen);
