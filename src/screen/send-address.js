import React from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {Title, H1Text} from '../component/text';
import {TextInput} from '../component/input';
import {BigButton, IconButton} from '../component/button';
import {Header, MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import * as send from '../action/send';

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    height: 150,
  },
});

const SendAddressScreen = () => (
  <Background>
    <Header>
      <IconButton
        iconName={'chevron-left'}
        onPress={() => nav.goBack()}
      />
      <Title>@Address</Title>
      <IconButton/>
    </Header>
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
      <BigButton
        processing={store.send.processing}
        onPress={() => send.parseUri()}>
        Check Address
      </BigButton>
    </MainContent>
  </Background>
);

export default observer(SendAddressScreen);
