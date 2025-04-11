import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Title, Text} from '../component/text';
import {BigButton, IconButton, BackButton} from '../component/button';
import {Header, MainContent} from '../component/layout';
import {Background} from '../component/background';
import {font} from '../component/style';

import store from '../store';
import * as nav from '../action/nav';
import * as send from '../action/send';

const styles = StyleSheet.create({
  paramsWrapper: {
    flex: 1,
  },
  label: {
    marginTop: 30,
  },
  value: {
    marginTop: 10,
    fontSize: font.sizeXXL,
    lineHeight: font.lineHeightXXL,
  },
  fee: {
    marginTop: 10,
    fontSize: font.sizeXL,
    lineHeight: font.lineHeightXL,
  },
  addressText: {
    marginVertical: 20,
    fontSize: font.sizeSub,
    lineHeight: font.lineHeightSub,
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
        <Text style={styles.label}>Amount:</Text>
        <Text
          style={styles.value}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {store.sendValueLabel}
        </Text>
        <Text style={styles.label}>Fee:</Text>
        <Text
          style={styles.fee}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {store.sendFeeLabel}
        </Text>
        <Text style={styles.label}>Note:</Text>
        <Text
          style={styles.addressText}
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          {store.send.description}
        </Text>
      </View>
      <BigButton style={styles.nextBtn} onPress={() => send.validateSend()}>
        Send
      </BigButton>
    </MainContent>
  </Background>
);

export default observer(SendConfirmScreen);
