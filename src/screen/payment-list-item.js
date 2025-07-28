import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Text, Title} from '../component/text';
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
import {openExplorer} from '../action/payment';

const styles = StyleSheet.create({
  paramsWrapper: {
    flex: 1,
  },
  midBox: {
    marginVertical: 10,
  },
  lastLine: {
    marginBottom: 0,
  },
});

const SendSuccessScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title style={styles.title}>Payment</Title>
      <CloseButton onPress={() => nav.goBackTo('Main')} />
    </Header>
    <MainContent>
      <View style={styles.paramsWrapper}>
        <SummaryBox>
          <SummaryLine>
            <SummaryLabel>Description</SummaryLabel>
          </SummaryLine>
          <Text ellipsizeMode="tail" numberOfLines={3}>
            {store.paymentDescriptionLabel}
          </Text>
        </SummaryBox>
        <SummaryBox style={styles.midBox}>
          <SummaryLine>
            <SummaryLabel>Date</SummaryLabel>
            <Text>{store.paymentTimeLabel}</Text>
          </SummaryLine>
          <SummaryLine>
            <SummaryLabel>Status</SummaryLabel>
            <Text>{store.paymentStatusLabel}</Text>
          </SummaryLine>
          <SummaryLine>
            <SummaryLabel>Network</SummaryLabel>
            <Text>{store.paymentNetworkLabel}</Text>
          </SummaryLine>
          <SummaryLine style={styles.lastLine}>
            <SummaryLabel>Type</SummaryLabel>
            <Text>{store.paymentTypeLabel}</Text>
          </SummaryLine>
        </SummaryBox>
        <SummaryBox>
          <SummaryLine>
            <SummaryLabel>Amount</SummaryLabel>
            <SummaryItem
              top={store.paymentAmountFiatLabel}
              bottom={store.paymentAmountSatLabel}
            />
          </SummaryLine>
          <SummaryLine>
            <SummaryLabel>Network Fees</SummaryLabel>
            <SummaryItem
              top={store.paymentFeeFiatLabel}
              bottom={store.paymentFeeSatLabel}
            />
          </SummaryLine>
          <SummaryTotal>
            <SummaryItem
              top={store.paymentTotalFiatLabel}
              bottom={store.paymentTotalSatLabel}
            />
          </SummaryTotal>
        </SummaryBox>
      </View>
      <BigButton onPress={() => openExplorer()}>
        View on Block Explorer
      </BigButton>
    </MainContent>
  </Background>
);

export default observer(SendSuccessScreen);
