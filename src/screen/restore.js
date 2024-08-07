import React from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {observer} from 'mobx-react';

import {H1Text} from '../component/text';
import {TextInput} from '../component/input';
import {PillButton} from '../component/button';
import {MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as userId from '../action/user-id';
import * as backup from '../action/backup';

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
  btnWrapper: {
    marginTop: 30,
    height: 200,
  },
  btnNext: {
    marginBottom: 20,
  },
});

const RestoreScreen = () => (
  <Background>
    <MainContent>
      <H1Text>Enter your PIN</H1Text>
      <TextInput
        placeholder="PIN"
        keyboardType="number-pad"
        textContentType="password"
        secureTextEntry
        autoFocus
        style={styles.input}
        value={store.backup.pin}
        onChangeText={pin => backup.setPin(pin)}
      />
      <Spacer />
      <View style={styles.btnWrapper}>
        <PillButton style={styles.btnNext} onPress={() => backup.validatePin()}>
          Next
        </PillButton>
        <Button title="Forgot PIN?" onPress={() => userId.initPinReset()} />
      </View>
    </MainContent>
  </Background>
);

export default observer(RestoreScreen);
