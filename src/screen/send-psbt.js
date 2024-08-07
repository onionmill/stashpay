import React from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {observer} from 'mobx-react';

import {Spacer} from '../component/layout';
import {PillButton} from '../component/button';
import {Background} from '../component/background';

import * as send from '../action/send';

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  btnWrapper: {
    marginTop: 50,
    marginBottom: 20,
  },
});

const SendPsbtScreen = () => (
  <Background style={styles.wrapper}>
    <Spacer />
    <View style={styles.btnWrapper}>
      <Button title="Export PSBT" onPress={() => send.exportPsbt()} />
    </View>
    <View style={styles.btnWrapper}>
      <PillButton onPress={() => send.importSignedPbst()}>
        Import signed PSBT
      </PillButton>
    </View>
  </Background>
);

export default observer(SendPsbtScreen);
