import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {font, color} from '../component/style';
import {Text, Title} from '../component/text';
import {Background} from '../component/background';
import {MainContent, Header} from '../component/layout';
import {GlasButton, IconButton} from '../component/button';

import store from '../store';
import * as nav from '../action/nav';
import {initReceive} from '../action/receive';

const styles = StyleSheet.create({
  content: {
    paddingBottom: 50,
    justifyContent: 'space-between',
  },
});

const WalletScreen = () => (
  <Background>
    <MainContent style={styles.content}>
      <Header>
        <IconButton
          iconName={'clock'}
          onPress={() => nav.goTo('PaymentList')}
        />
        <Title>StashPay</Title>
        <IconButton
          iconName={'settings'}
          onPress={() => nav.goTo('Settings')}
        />
      </Header>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    fontSize: font.sizeXXXL,
    lineHeight: font.lineHeightXXXL,
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
        {'$1,234.56' || store.balanceLabel}
      </Text>
      <Text style={balanceStyles.secondary}>
        1,457,626 sats
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
    borderTopLeftRadius: 21,
    borderBottomLeftRadius: 21,
  },
  rightBtn: {
    flex: 1,
    borderTopRightRadius: 21,
    borderBottomRightRadius: 21,
  },
});

const SendReceiveButton = ({ onSend, onReceive }) => (
  <View style={bigBtnStyles.wrapper}>
    <GlasButton onPress={onReceive} style={bigBtnStyles.leftBtn}>
      Receive
    </GlasButton>
    <GlasButton onPress={onSend} style={bigBtnStyles.rightBtn}>
      Send
    </GlasButton>
  </View>
);

export default observer(WalletScreen);
