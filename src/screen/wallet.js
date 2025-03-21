import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {font} from '../component/style';
import {Text, Header} from '../component/text';
import {Background} from '../component/background';
import {MainContent, Navbar} from '../component/layout';
import {GlasButton, IconButton} from '../component/button';

import store from '../store';
import * as nav from '../action/nav';
import {initReceive} from '../action/receive';

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const WalletScreen = () => (
  <Background>
    <MainContent>
      <Navbar>
        <IconButton
          iconName={'clock'}
          onPress={() => nav.goTo('PaymentList')}
        />
        <Header>StashPay</Header>
        <IconButton
          iconName={'settings'}
          onPress={() => nav.goTo('Settings')}
        />
      </Navbar>
      <View style={styles.wrapper}>
        <Balance />
        <SendReceiveButton
          onSend={() => nav.goTo('SendStack')}
          onReceive={() => initReceive()}
        />
      </View>
    </MainContent>
  </Background>
);

const balanceStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: font.sizeXXL,
    lineHeight: font.lineHeightXXL,
  },
  numeral: {
    fontSize: font.sizeXXXL,
    lineHeight: font.lineHeightXXXL,
  },
});

const Balance = observer(() => {
  return (
    <View style={balanceStyles.wrapper}>
      <Text style={balanceStyles.label}>Total sats</Text>
      <Text
        style={balanceStyles.numeral}
        adjustsFontSizeToFit={true}
        numberOfLines={1}>
        {store.balanceLabel}
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
    marginTop: 60,
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
