import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {H1Text} from '../component/text';
import {TextInput} from '../component/input';
import {PillButton} from '../component/button';
import {MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as send from '../action/send';

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
  btnWrapper: {
    marginTop: 10,
    height: 150,
  },
});

const SendAmountScreen = () => (
  <Background>
    <MainContent>
      <H1Text>Amount (sats)</H1Text>
      <TextInput
        placeholder={store.sendMinValueLabel}
        keyboardType="number-pad"
        autoFocus
        style={styles.input}
        value={store.send.value}
        onChangeText={value => send.setAmount(value)}
      />
      <Spacer />
      <View style={styles.btnWrapper}>
        <PillButton onPress={() => send.validateAmount()}>Review</PillButton>
      </View>
    </MainContent>
  </Background>
);

export default observer(SendAmountScreen);
