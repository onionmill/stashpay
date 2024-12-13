import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {AmountInput} from '../component/input';
import {PillButton} from '../component/button';
import {MainContent} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as send from '../action/send';

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  btnWrapper: {
    marginTop: 20,
    height: 150,
  },
});

const SendAmountScreen = () => (
  <Background>
    <MainContent>
      <AmountInput
        placeholder={store.sendMinValueLabel}
        keyboardType="number-pad"
        autoFocus
        style={styles.input}
        value={store.send.value}
        onChangeText={value => send.setAmount(value)}
      />
      <View style={styles.btnWrapper}>
        <PillButton onPress={() => send.validateAmount()}>Review</PillButton>
      </View>
    </MainContent>
  </Background>
);

export default observer(SendAmountScreen);
