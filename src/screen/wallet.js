import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {font, color} from '../component/style';
import {Text, Title} from '../component/text';
import {Background} from '../component/background';
import {MainContent, Header} from '../component/layout';
import {BigButton, IconButton} from '../component/button';

import store from '../store';
import * as nav from '../action/nav';
import {initReceive} from '../action/receive';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'SFProDisplay-Semibold',
  },
  content: {
    paddingBottom: 50,
  },
});

const WalletScreen = () => (
  <Background keyboardAvoid>
    <Header>
      <IconButton
        iconName={'clock'}
        alert={store.balancePendingReceive || store.balancePendingSend}
        onPress={() => nav.goTo('PaymentListStack')}
      />
      <Title style={styles.title}>StashPay</Title>
      <IconButton
        iconName={'settings'}
        onPress={() => nav.goTo('Settings')}
      />
    </Header>
    <MainContent style={styles.content}>
      <Balance />
      <SendReceiveButton
        onSend={() => nav.goTo('SendStack')}
        onReceive={() => initReceive()}
      />
    </MainContent>
  </Background>
);

const balanceStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    fontSize: font.sizeXXXXL,
    lineHeight: font.lineHeightXXXXL,
  },
  secondary: {
    color: color.textSecondary,
    fontSize: font.sizeL,
    lineHeight: font.lineHeightL,
  },
});

const Balance = observer(() => {
  return (
    <View style={balanceStyles.wrapper}>
      <Text
        style={balanceStyles.primary}
        adjustsFontSizeToFit={true}
        numberOfLines={1}>
        {store.balanceFiatLabel}
      </Text>
      <Text style={balanceStyles.secondary}>
        {store.balanceSatLabel}
      </Text>
    </View>
  );
});

//
// Send Receive Button
//

const bigBtnStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  leftBtn: {
    flex: 1,
    marginRight: 4,
  },
  rightBtn: {
    flex: 1,
    marginLeft: 4,
  },
});

const SendReceiveButton = ({ onSend, onReceive }) => (
  <View style={bigBtnStyles.wrapper}>
    <BigButton onPress={onReceive} style={bigBtnStyles.leftBtn}>
      Receive
    </BigButton>
    <BigButton onPress={onSend} style={bigBtnStyles.rightBtn}>
      Send
    </BigButton>
  </View>
);

export default observer(WalletScreen);
