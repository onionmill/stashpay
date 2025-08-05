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
import {Header, ScrollContent} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import {openExplorer} from '../action/payment';
import {selectRefundable} from '../action/refund';

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
  btn: {
    marginTop: 10,
  },
});

const SendSuccessScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title style={styles.title}>Payment</Title>
      <CloseButton onPress={() => nav.goBackTo('Main')} />
    </Header>
    <ScrollContent>
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
              top={store.paymentAmountSatLabel}
              bottom={store.paymentAmountFiatLabel}
            />
          </SummaryLine>
          <SummaryLine>
            <SummaryLabel>Network Fees</SummaryLabel>
            <SummaryItem
              top={store.paymentFeeSatLabel}
              bottom={store.paymentFeeFiatLabel}
            />
          </SummaryLine>
          <SummaryTotal>
            <SummaryItem
              top={store.paymentTotalSatLabel}
              bottom={store.paymentTotalFiatLabel}
            />
          </SummaryTotal>
        </SummaryBox>
      </View>
      {store.selectedPayment.status === 'refundable' ? (
        <BigButton
          icon="rewind"
          style={styles.btn}
          onPress={() => selectRefundable()}>
          Refund Payment
        </BigButton>
      ) : null}
      <BigButton style={styles.btn} onPress={() => openExplorer()}>
        View on Block Explorer
      </BigButton>
    </ScrollContent>
  </Background>
);

export default observer(SendSuccessScreen);
