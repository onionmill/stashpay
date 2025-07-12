import React from 'react';
import {View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {Title, ErrorLabel} from '../component/text';
import {Background} from '../component/background';
import {Header, MainContent} from '../component/layout';
import {BigButton, IconButton, FlipButton, BackButton} from '../component/button';
import {AmountInput} from '../component/input';
import {Toggle} from '../component/toggle';

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
  <Background keyboardAvoid>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Receive</Title>
      <IconButton/>
    </Header>
    <MainContent>
      {!store.receive.unified ? (
        <Toggle
          label1="Lightning"
          label2="OnChain"
          value={store.receive.onChain ? '2' : '1'}
          onPress={() => receive.toggleOnchain()}
        />
      ) : null}
      <View style={styles.amountWrapper}>
        <AmountInput
          prefix={store.receiveInputPrefixLabel}
          suffix={store.receiveInputSuffixLabel}
          value={store.receive.value}
          onChangeText={value => receive.setAmount(value)}
        />
        <FlipButton
          onPress={() => receive.toggleFiat()}
          label={store.receiveFlipLabel}
        />
      </View>
      <BigButton
        disabled={store.receiveAmountInvalid}
        onPress={() => nav.goTo('Receive')}>
        Create Invoice
      </BigButton>
      <ErrorLabel error={store.receiveAmountInvalid}>
        {store.receiveMinMaxValueLabel}
      </ErrorLabel>
    </MainContent>
  </Background>
);

export default observer(ReceiveAmountScreen);
