import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '../component/text';
import {PillButton} from '../component/button';
import {font} from '../component/style';

import * as nav from '../action/nav';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    padding: 20,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: font.sizeXXL,
    lineHeight: font.lineHeightXXL,
  },
});

const SendSuccessScreen = () => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.wrapper}>
      <View style={styles.textWrapper}>
        <Text style={styles.label}>Payment sent!</Text>
      </View>
      <PillButton onPress={() => nav.reset('Main')}>
        Done
      </PillButton>
    </View>
  </SafeAreaView>
);

export default observer(SendSuccessScreen);
