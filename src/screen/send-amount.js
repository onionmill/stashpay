import React from 'react';
import {observer} from 'mobx-react';

import {Title} from '../component/text';
import {AmountInput} from '../component/input';
import {BigButton, IconButton, BackButton} from '../component/button';
import {Header, MainContent} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import * as send from '../action/send';

const SendAmountScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Amount</Title>
      <IconButton/>
    </Header>
    <MainContent>
      <AmountInput
        value={store.send.value}
        onChangeText={value => send.setAmount(value)}
      />
      <BigButton
        processing={store.send.processing}
        onPress={() => send.validateAmount()}>
        Review
      </BigButton>
    </MainContent>
  </Background>
);

export default observer(SendAmountScreen);
