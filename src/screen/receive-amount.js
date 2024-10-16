import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {H1Text} from '../component/text';
import {TextInput} from '../component/input';
import {PillButton} from '../component/button';
import {MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import * as receive from '../action/receive';

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
  btnWrapper: {
    marginTop: 10,
    height: 150,
  },
});

const ReceiveAmountScreen = () => (
  <Background style={styles.wrapper}>
    <MainContent>
      <H1Text>Amount (sats)</H1Text>
      <TextInput
        placeholder={store.receiveMinValueLabel}
        keyboardType="number-pad"
        autoFocus
        style={styles.input}
        value={store.receive.value}
        onChangeText={value => receive.setAmount(value)}
      />
      <Spacer />
      <View style={styles.btnWrapper}>
      <PillButton onPress={() => nav.goBack()}>Request Amount</PillButton>
      </View>
    </MainContent>
  </Background>
);

export default observer(ReceiveAmountScreen);
