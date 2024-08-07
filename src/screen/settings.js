import React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import {observer} from 'mobx-react';

import store from '../store';
import * as wallet from '../action/wallet';
import * as backup from '../action/backup';
import * as userId from '../action/user-id';
import * as multisig from '../action/multisig';

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
      <Text>{store.settings.email}</Text>
      <Button
        title="Set Recovery Email"
        onPress={() => userId.initEmailSet()}
      />
    </View>
    <View style={styles.btnWrapper}>
      <Button title="Change PIN" onPress={() => backup.initPinChange()} />
    </View>
    <View style={styles.btnWrapper}>
      <Button
        title="Import ColdCard"
        onPress={() => multisig.importColdCard()}
      />
    </View>
    <View style={styles.btnWrapper}>
      <Button
        title="Export Multisig.txt"
        onPress={() => multisig.exportTxtFile()}
      />
    </View>
    <View style={styles.btnWrapper}>
      <Button title="Logout" onPress={() => wallet.logout()} />
    </View>
  </View>
);

export default observer(SettingsScreen);
