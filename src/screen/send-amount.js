import React from 'react';
import {View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {Title, ErrorLabel} from '../component/text';
import {AmountInput} from '../component/input';
import {BigButton, IconButton, FlipButton, BackButton} from '../component/button';
import {Header, MainContent} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import * as send from '../action/send';

const styles = StyleSheet.create({
  amountWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SendAmountScreen = () => (
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
          value={store.send.value}
          onChangeText={value => send.setAmount(value)}
        />
        <FlipButton
          onPress={() => send.toggleFiat()}
          label={store.sendFlipLabel}
        />
      </View>
      <BigButton
        disabled={store.sendAmountInvalid}
        processing={store.send.processing}
        onPress={() => send.validateAmount()}>
        Review
      </BigButton>
      <ErrorLabel error={store.sendAmountInvalid}>
        {store.sendMinValueLabel}
      </ErrorLabel>
    </MainContent>
  </Background>
);

export default observer(SendAmountScreen);
