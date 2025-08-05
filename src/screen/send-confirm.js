import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Title, Text} from '../component/text';
import {
  SummaryBox,
  SummaryItem,
  SummaryLabel,
  SummaryLine,
  SummaryTotal,
} from '../component/summary';
import {BigButton, CloseButton, BackButton} from '../component/button';
import {Header, MainContent} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import * as send from '../action/send';

const styles = StyleSheet.create({
  paramsWrapper: {
    flex: 1,
  },
  topBox: {
    marginTop: 40,
  },
  bottomBox: {
    marginTop: 15,
  },
  nextBtn: {
    marginTop: 50,
  },
});

const SendConfirmScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Confirm</Title>
      <CloseButton onPress={() => nav.goBackTo('Main')} />
    </Header>
    <MainContent>
      <View style={styles.paramsWrapper}>
        <SummaryBox style={styles.topBox}>
          <SummaryLine>
            <SummaryLabel>{store.sendDescriptionTitle}</SummaryLabel>
          </SummaryLine>
          <Text>
            {store.sendDescriptionLabel}
          </Text>
        </SummaryBox>
        <SummaryBox style={styles.bottomBox}>
          <SummaryLine>
            <SummaryLabel>Amount</SummaryLabel>
            <SummaryItem
              top={store.sendAmountSatLabel}
              bottom={store.sendAmountFiatLabel}
            />
          </SummaryLine>
          <SummaryLine>
            <SummaryLabel>Network Fees</SummaryLabel>
            <SummaryItem
              top={store.sendFeeSatLabel}
              bottom={store.sendFeeFiatLabel}
            />
          </SummaryLine>
          <SummaryTotal>
            <SummaryItem
              top={store.sendTotalSatLabel}
              bottom={store.sendTotalFiatLabel}
            />
          </SummaryTotal>
        </SummaryBox>
      </View>
      <BigButton style={styles.nextBtn} onPress={() => send.validateSend()}>
        Send
      </BigButton>
    </MainContent>
  </Background>
);

export default observer(SendConfirmScreen);
