import React from 'react';
import {View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {Title, ErrorLabel} from '../component/text';
import {Background} from '../component/background';
import {Header, MainContent} from '../component/layout';
import {BigButton, IconButton, FlipButton, BackButton} from '../component/button';
import {AmountInput} from '../component/input';

import store from '../store';
import * as nav from '../action/nav';
import * as receive from '../action/receive';

const styles = StyleSheet.create({
  amountWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ReceiveAmountScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Amount</Title>
      <IconButton/>
    </Header>
    <MainContent>
      <View style={styles.amountWrapper}>
        <AmountInput
          prefix={store.receiveInputPrefixLabel}
          suffix={store.receiveInputSuffixLabel}
          value={store.receive.value}
          onChangeText={value => receive.setAmount(value)}
        />
        <FlipButton label={'21 sats'} />
      </View>
      <BigButton onPress={() => nav.goTo('Receive')}>
        Create Invoice
      </BigButton>
      <ErrorLabel error={true}>$0.21 minimum</ErrorLabel>
    </MainContent>
  </Background>
);

export default observer(ReceiveAmountScreen);
