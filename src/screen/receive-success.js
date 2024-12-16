import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '../component/text';
import {PillButton} from '../component/button';
import {MainContent} from '../component/layout';
import {Background} from '../component/background';
import {font} from '../component/style';

import * as nav from '../action/nav';

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
        <Text style={styles.value}>{route.params.valueLabel} sats</Text>
        <Text style={styles.label}>Payment received!</Text>
      </View>
      <PillButton onPress={() => nav.reset('Main')}>Done</PillButton>
    </MainContent>
  </Background>
);

export default observer(ReceiveSuccessScreen);
