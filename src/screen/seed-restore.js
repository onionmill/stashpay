import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {H1Text} from '../component/text';
import {TextInput} from '../component/input';
import {PillButton} from '../component/button';
import {MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as wallet from '../action/wallet';

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    height: 150,
  },
  btnWrapper: {
    marginTop: 30,
    height: 150,
  },
});

const SeedRestoreScreen = () => (
  <Background>
    <MainContent>
      <H1Text>Recover Wallet</H1Text>
      <TextInput
        placeholder="recovery phrase"
        textContentType="password"
        autoFocus
        multiline
        style={styles.input}
        value={store.restore.mnemonic}
        onChangeText={mnemonic => wallet.setMnemonic(mnemonic)}
      />
      <Spacer />
      <View style={styles.btnWrapper}>
        <PillButton onPress={() => wallet.importMnemonic()}>
          Import Wallet
        </PillButton>
      </View>
    </MainContent>
  </Background>
);

export default observer(SeedRestoreScreen);
