import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '../component/text';
import {PillButton} from '../component/button';
import {font} from '../component/style';

import * as nav from '../action/nav';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 25,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: font.sizeXXL,
    lineHeight: font.lineHeightXXL,
  },
  label: {
    marginTop: 20,
    fontSize: font.sizeXXL,
    lineHeight: font.lineHeightXXL,
  },
});

const ReceiveSuccessScreen = ({route}) => (
  <View style={styles.wrapper}>
    <View style={styles.textWrapper}>
      <Text style={styles.value}>{route.params.valueLabel} sats</Text>
      <Text style={styles.label}>Payment received!</Text>
    </View>
    <PillButton onPress={() => nav.reset('Main')}>Done</PillButton>
  </View>
);

export default observer(ReceiveSuccessScreen);
