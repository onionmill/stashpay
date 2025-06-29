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
import {BigButton, IconButton, BackButton} from '../component/button';
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
    marginTop: 50,
  },
  bottomBox: {
    marginTop: 15,
  },
  addressText: {
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
      <IconButton/>
    </Header>
    <MainContent>
      <View style={styles.paramsWrapper}>
        <SummaryBox style={styles.topBox}>
          <SummaryLine>
            <SummaryLabel>Description</SummaryLabel>
          </SummaryLine>
          <Text style={styles.addressText}>
            {store.send.description || 'No description provided'}
          </Text>
        </SummaryBox>
        <SummaryBox style={styles.bottomBox}>
          <SummaryLine>
            <SummaryLabel>Amount</SummaryLabel>
            <SummaryItem
              top={store.sendValueFiatLabel}
              bottom={store.sendValueSatLabel}
            />
          </SummaryLine>
          <SummaryLine>
            <SummaryLabel>Network Fees</SummaryLabel>
            <SummaryItem
              top={store.sendFeeFiatLabel}
              bottom={store.sendFeeSatLabel}
            />
          </SummaryLine>
          <SummaryTotal>
            <SummaryItem
              top={store.sendTotalFiatLabel}
              bottom={store.sendTotalSatLabel}
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
