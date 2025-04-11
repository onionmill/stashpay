import React from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {Title, H1Text, Text} from '../component/text';
import {IconButton, BackButton, BigButton} from '../component/button';
import {Header, MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import * as wallet from '../action/wallet';

const styles = StyleSheet.create({
  seed: {
    marginTop: 20,
  },
});

const SeedBackupScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBackTo('Settings')} />
      <Title>Backup</Title>
      <IconButton/>
    </Header>
    <MainContent>
      <H1Text>Recovery Phrase</H1Text>
      <Text style={styles.seed}>{store.mnemonic}</Text>
      <Spacer />
      <BigButton onPress={() => wallet.copyMnemonic()}>
        Copy to Clipboard
      </BigButton>
    </MainContent>
  </Background>
);

export default observer(SeedBackupScreen);
