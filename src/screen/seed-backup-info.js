import React from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {Title, H1Text, Text} from '../component/text';
import {IconButton, BackButton, BigButton} from '../component/button';
import {Header, MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import * as nav from '../action/nav';
import * as wallet from '../action/wallet';

const styles = StyleSheet.create({
  info: {
    marginTop: 20,
  },
  warning: {
    marginTop: 20,
    fontWeight: 'bold',
  },
});

const SeedBackupInfoScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Backup</Title>
      <IconButton/>
    </Header>
    <MainContent>
      <H1Text>Recovery Phrase</H1Text>
      <Text style={styles.info}>
        The recovery phrase (or seed phrase) is a list of 12 words. It gives you access to your funds and allows you to recover your wallet on another device.
      </Text>
      <Text style={styles.warning}>
        Do not show this to anyone and don't take a screenshot.
      </Text>
      <Text style={styles.info}>
        The most secure backup option is to write it down on a piece of paper and keep that in a safe place. For smaller amounts you can also copy & paste it into a password manager.
      </Text>
      <Spacer />
      <BigButton onPress={() => wallet.initSeedDisplay()}>
        Display Recovery Phrase
      </BigButton>
    </MainContent>
  </Background>
);

export default observer(SeedBackupInfoScreen);
