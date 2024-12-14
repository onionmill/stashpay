import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {H1Text} from '../component/text';
import {TextInput} from '../component/input';
import {PillButton} from '../component/button';
import {MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as send from '../action/send';

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    height: 150,
  },
  btnWrapper: {
    marginTop: 10,
    height: 150,
  },
});

const SendAddressScreen = () => (
  <Background>
    <MainContent>
      <H1Text>Lightning Address</H1Text>
      <TextInput
        placeholder="satoshi@stashpay.me"
        keyboardType="email-address"
        autoFocus
        multiline
        style={styles.input}
        value={store.send.rawUri}
        onChangeText={rawUri => send.setUri(rawUri)}
      />
      <Spacer />
      <View style={styles.btnWrapper}>
        <PillButton onPress={() => send.parseUri()}>
          Check Address
        </PillButton>
      </View>
    </MainContent>
  </Background>
);

export default observer(SendAddressScreen);
