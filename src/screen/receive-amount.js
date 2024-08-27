import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '../component/text';
import {TextInput} from '../component/input';
import {PillButton} from '../component/button';
import {Background} from '../component/background';
import {font} from '../component/style';

import store from '../store';
import * as nav from '../action/nav';
import * as receive from '../action/receive';

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  paramsWrapper: {
    flex: 1,
  },
  label: {
    marginTop: 20,
  },
  input: {
    fontSize: font.sizeXL,
    height: font.lineHeightXL,
  },
  addressText: {
    marginVertical: 15,
    fontSize: font.sizeSub,
    lineHeight: font.lineHeightSub,
  },
  btnWrapper: {
    marginTop: 10,
    height: 150,
  },
});

const ReceiveAmountScreen = () => (
  <Background style={styles.wrapper}>
    <View style={styles.paramsWrapper}>
      <Text style={styles.label}>Amount (sats):</Text>
      <TextInput
        placeholder="1000 minumum"
        keyboardType="number-pad"
        autoFocus
        style={styles.input}
        value={store.receive.value}
        onChangeText={value => receive.setAmount(value)}
      />
    </View>
    <View style={styles.btnWrapper}>
      <PillButton onPress={() => nav.goBack()}>Request Amount</PillButton>
    </View>
  </Background>
);

export default observer(ReceiveAmountScreen);
