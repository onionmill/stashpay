import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Title, Text} from '../component/text';
import {CloseButton, BackButton, BigButton} from '../component/button';
import {Header, MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';
import {font, color} from '../component/style';

import store from '../store';
import * as nav from '../action/nav';
import * as wallet from '../action/wallet';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
  },
});

const SeedBackupScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Backup Wallet</Title>
      <CloseButton onPress={() => nav.goBackTo('Main')} />
    </Header>
    <MainContent>
      <View style={styles.wrapper}>
        <View>
          {store.mnemonic.split(' ').slice(0, 6).map((word, index) =>
            <SeedWord key={index} index={index} word={word} />
          )}
        </View>
        <View>
          {store.mnemonic.split(' ').slice(6).map((word, index) =>
            <SeedWord key={index + 6} index={index + 6} word={word} />
          )}
        </View>
      </View>
      <Spacer />
      <BigButton icon="copy" onPress={() => wallet.copyMnemonic()}>
        Copy to Clipboard
      </BigButton>
    </MainContent>
  </Background>
);

const wordStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  index: {
    alignSelf: 'flex-start',
    fontSize: font.sizeSub,
    color: color.textFine,
  },
  word: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: font.sizeXL,
    lineHeight: font.lineHeightXL,
    marginLeft: 8,
    marginBottom: 25,
  },
});

const SeedWord = ({index, word}) => (
  <View style={wordStyles.wrapper}>
    <Text style={wordStyles.index}>{index + 1}</Text>
    <Text style={wordStyles.word}>{word}</Text>
  </View>
);

export default observer(SeedBackupScreen);
