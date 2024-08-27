import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {H1Text, Text} from '../component/text';
import {PillButton} from '../component/button';
import {MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as wallet from '../action/wallet';

const styles = StyleSheet.create({
  seed: {
    marginTop: 20,
  },
  btnWrapper: {
    marginTop: 30,
    height: 150,
  },
});

const SeedBackupScreen = () => (
  <Background>
    <MainContent>
      <H1Text>Recovery Phrase</H1Text>
      <Text style={styles.seed}>{store.mnemonic}</Text>
      <Spacer />
      <View style={styles.btnWrapper}>
        <PillButton onPress={() => wallet.copyMnemonic()}>
          Copy to Clipboard
        </PillButton>
      </View>
    </MainContent>
  </Background>
);

export default observer(SeedBackupScreen);
