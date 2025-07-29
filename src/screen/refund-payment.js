import React from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {Title, H1Text} from '../component/text';
import {TextInput} from '../component/input';
import {BigButton, CloseButton, BackButton} from '../component/button';
import {Header, MainContent} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import * as refund from '../action/refund';

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 24,
  },
});

const RefundPaymentScreen = () => (
  <Background keyboardAvoid>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Refund</Title>
      <CloseButton onPress={() => nav.goBackTo('Main')} />
    </Header>
    <MainContent>
      <H1Text>Refund Payment</H1Text>
      <TextInput
        placeholder="refund address"
        autoFocus
        multiline
        style={styles.input}
        value={store.refund.refundAddress}
        onChangeText={value => refund.setRefundAddress(value)}
      />
      <BigButton
        processing={store.refund.processing}
        onPress={() => refund.refundToAddress()}>
        Refund To Address
      </BigButton>
    </MainContent>
  </Background>
);

export default observer(RefundPaymentScreen);
