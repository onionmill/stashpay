import React from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {Title, H1Text} from '../component/text';
import {TextInput} from '../component/input';
import {IconButton, BackButton, BigButton} from '../component/button';
import {Header, MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import * as wallet from '../action/wallet';

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    height: 150,
  },
});

const SeedRestoreScreen = () => (
  <Background keyboardAvoid>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Recovery</Title>
      <IconButton/>
    </Header>
    <MainContent>
      <H1Text>Recover Wallet</H1Text>
      <TextInput
        placeholder="recovery phrase separated by spaces"
        textContentType="password"
        autoFocus
        multiline
        style={styles.input}
        value={store.restore.mnemonic}
        onChangeText={mnemonic => wallet.setMnemonic(mnemonic)}
      />
      <Spacer />
      <BigButton onPress={() => wallet.importMnemonic()}>
        Import Wallet
      </BigButton>
    </MainContent>
  </Background>
);

export default observer(SeedRestoreScreen);
