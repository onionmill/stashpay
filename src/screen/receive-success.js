import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {observer} from 'mobx-react';

import {Text} from '../component/text';
import {
  SummaryBox,
  SummaryItem,
  SummaryLabel,
  SummaryLine,
  SummaryTotal,
} from '../component/summary';
import {BigButton} from '../component/button';
import {MainContent} from '../component/layout';
import {Background} from '../component/background';
import {font} from '../component/style';

import store from '../store';
import * as nav from '../action/nav';

const styles = StyleSheet.create({
  paramsWrapper: {
    flex: 1,
  },
  check: {
    marginTop: 65,
    height: 50,
    width: 50,
  },
  label: {
    marginVertical: 20,
    fontFamily: 'SFProDisplay-Medium',
    fontSize: font.sizeXXL,
    lineHeight: font.lineHeightXXL,
  },
});

const ReceiveSuccessScreen = () => (
  <Background>
    <MainContent>
      <View style={styles.paramsWrapper}>
        <Image style={styles.check} source={require('../asset/img/check.png')} />
        <Text style={styles.label}>Payment received!</Text>
        <SummaryBox>
          <SummaryLine>
            <SummaryLabel>Amount</SummaryLabel>
            <SummaryItem
              top={store.receiveEventAmountSatLabel}
              bottom={store.receiveEventAmountFiatLabel}
            />
          </SummaryLine>
          <SummaryLine>
            <SummaryLabel>Network Fees</SummaryLabel>
            <SummaryItem
              top={store.receiveEventFeesSatLabel}
              bottom={store.receiveEventFeesFiatLabel}
            />
          </SummaryLine>
          <SummaryTotal>
            <SummaryItem
              top={store.receiveEventTotalSatLabel}
              bottom={store.receiveEventTotalFiatLabel}
            />
          </SummaryTotal>
        </SummaryBox>
      </View>
      <BigButton onPress={() => nav.reset('Main')}>Done</BigButton>
    </MainContent>
  </Background>
);

export default observer(ReceiveSuccessScreen);
