import React from 'react';
import {observer} from 'mobx-react';

import {Title} from '../component/text';
import {AmountInput} from '../component/input';
import {BigButton, IconButton} from '../component/button';
import {Header, MainContent} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import * as send from '../action/send';

const SendAmountScreen = () => (
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
        placeholder={store.sendMinValueLabel}
        keyboardType="number-pad"
        autoFocus
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
