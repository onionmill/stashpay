import React from 'react';
import {observer} from 'mobx-react';

import {Title} from '../component/text';
import {Background} from '../component/background';
import {Header, MainContent} from '../component/layout';
import {BigButton, IconButton} from '../component/button';
import {AmountInput} from '../component/input';

import store from '../store';
import * as nav from '../action/nav';
import * as receive from '../action/receive';

const ReceiveAmountScreen = () => (
  <Background form>
    <Header>
      <IconButton
        iconName={'chevron-left'}
        onPress={() => nav.goBack()}
      />
      <Title>Amount</Title>
      <IconButton/>
    </Header>
    <MainContent>
      <AmountInput
        placeholder={store.receiveMinValueLabel}
        keyboardType="number-pad"
        autoFocus
        value={store.receive.value}
        onChangeText={value => receive.setAmount(value)}
      />
      <BigButton onPress={() => nav.goTo('Receive')}>
        Create Invoice
      </BigButton>
    </MainContent>
  </Background>
);

export default observer(ReceiveAmountScreen);
