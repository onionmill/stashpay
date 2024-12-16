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
  label: {
    fontSize: font.sizeXXL,
    lineHeight: font.lineHeightXXL,
  },
});

const SendSuccessScreen = () => (
  <Background>
    <MainContent>
      <View style={styles.textWrapper}>
        <Text style={styles.label}>Payment sent!</Text>
      </View>
      <PillButton onPress={() => nav.reset('Main')}>
        Done
      </PillButton>
    </MainContent>
  </Background>
);

export default observer(SendSuccessScreen);
