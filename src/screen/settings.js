import React from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import {observer} from 'mobx-react';

import {Title, Text} from '../component/text';
import {LinkButton, IconButton, BackButton} from '../component/button';
import {color, font} from '../component/style';
import {Header, MainContent} from '../component/layout';
import {Background} from '../component/background';
import {Section, SectionItem} from '../component/section';

import store from '../store';
import * as nav from '../action/nav';
import * as log from '../action/log';
import * as wallet from '../action/wallet';

const styles = StyleSheet.create({
  versionWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  versionText: {
    marginTop: 10,
    color: color.textFine,
    fontSize: font.sizeSub,
    lineHeight: font.lineHeightSub,
  },
  appName: {
    fontFamily: 'SFProDisplay-Bold',
  },
  linksWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SettingsScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Settings</Title>
      <IconButton/>
    </Header>
    <MainContent>
      <Section title="Recovery">
        <SectionItem
          title="Backup Wallet"
          onPress={() => wallet.initSeedBackup()}
          icon="chevron-right"
        />
        <SectionItem
          title="Recover Wallet"
          onPress={() => wallet.initSeedRestore()}
          icon="chevron-right"
        />
      </Section>
      <Section title="Advanced">
        <SectionItem
          title="Export logs"
          onPress={() => log.exportLogFile()}
          icon="download"
        />
        <SectionItem
          title="Wipe Wallet from Device"
          onPress={() => wallet.logout()}
          style={{color: color.danger}}
          icon="trash-2"
        />
      </Section>
      <View style={styles.versionWrapper}>
        <Text style={[styles.versionText, styles.appName]}>StashPay</Text>
        <View style={styles.linksWrapper}>
          <LinkButton
            title="Terms"
            style={styles.versionText}
            onPress={() => Linking.openURL('https://stashpay.me/terms/')}
          />
          <Text style={styles.versionText}>  &  </Text>
          <LinkButton
            title="Privacy"
            style={styles.versionText}
            onPress={() => Linking.openURL('https://stashpay.me/privacy/')}
          />
        </View>
        <Text style={styles.versionText}>
          Version {store.config.appVersion}
        </Text>
      </View>
    </MainContent>
  </Background>
);

export default observer(SettingsScreen);
