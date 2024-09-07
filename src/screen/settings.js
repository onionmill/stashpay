import React from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {observer} from 'mobx-react';

import * as wallet from '../action/wallet';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 15,
  },
  btnWrapper: {
    marginTop: 50,
    alignItems: 'center',
  },
});

const SettingsScreen = () => (
  <View style={styles.wrapper}>
    <View style={styles.btnWrapper}>
      <Button title="Backup wallet" onPress={() => wallet.initSeedBackup()} />
    </View>
    <View style={styles.btnWrapper}>
      <Button title="Recover wallet" onPress={() => wallet.initSeedRestore()} />
    </View>
    <View style={styles.btnWrapper}>
      <Button title="Logout" onPress={() => wallet.logout()} />
    </View>
  </View>
);

export default observer(SettingsScreen);
