import React from 'react';
import {StyleSheet, Button, View, SafeAreaView} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '../component/text';
import {color, font} from '../component/style';

import store from '../store';
import * as log from '../action/log';
import * as wallet from '../action/wallet';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    padding: 20,
  },
  btnWrapper: {
    marginTop: 50,
    alignItems: 'center',
  },
  versionWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  versionText: {
    color: color.darkGrey,
    fontSize: font.sizeSub,
    lineHeight: font.lineHeightSub,
  },
});

const SettingsScreen = () => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.wrapper}>
      <View style={styles.btnWrapper}>
        <Button
          title="Backup wallet"
          onPress={() => wallet.initSeedBackup()}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Button
          title="Recover wallet"
          onPress={() => wallet.initSeedRestore()}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Button
          title="Export logs"
          onPress={() => log.exportLogFile()}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Button
          title="Logout"
          color={color.red}
          onPress={() => wallet.logout()}
        />
      </View>
      <View style={styles.versionWrapper}>
        <Text style={styles.versionText}>
          version {store.config.appVersion}
        </Text>
      </View>
    </View>
  </SafeAreaView>
);

export default observer(SettingsScreen);
