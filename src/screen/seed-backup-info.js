import React from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {H1Text, Text} from '../component/text';
import {PillButton} from '../component/button';
import {MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import * as nav from '../action/nav';

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
      <PillButton onPress={() => nav.goTo('SeedBackup')}>
        Display Recovery Phrase
      </PillButton>
    </MainContent>
  </Background>
);

export default observer(SeedBackupInfoScreen);
