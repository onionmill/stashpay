import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '../component/text';
import {BigButton} from '../component/button';
import {MainContent} from '../component/layout';
import {Background} from '../component/background';
import {font} from '../component/style';

import store from '../store';
import * as nav from '../action/nav';
import {formatNumber, toFiatLabel} from '../util';

const styles = StyleSheet.create({
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
  <Background>
    <MainContent>
      <View style={styles.textWrapper}>
        <Text style={styles.value}>
          {toFiatLabel(route.params.valueSat, store.settings)} ({formatNumber(route.params.valueSat)} sats)
        </Text>
        <Text style={styles.label}>Payment received!</Text>
      </View>
      <BigButton onPress={() => nav.reset('Main')}>Done</BigButton>
    </MainContent>
  </Background>
);

export default observer(ReceiveSuccessScreen);
