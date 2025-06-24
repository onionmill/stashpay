import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {Title, Text} from '../component/text';
import {QRCode} from '../component/qrcode';
import {BigButton, IconButton, BackButton} from '../component/button';
import {LargeSpinner} from '../component/spinner';
import {Header, MainContent} from '../component/layout';
import {Background} from '../component/background';
import {font} from '../component/style';

import store from '../store';
import * as nav from '../action/nav';
import * as receive from '../action/receive';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  feeText: {
    marginTop: 20,
    fontSize: font.sizeSub,
    lineHeight: font.lineHeightSub,
  },
});

const ReceiveScreen = ({navigation}) => {
  React.useEffect(
    () => navigation.addListener('focus', () => receive.fetchInvoice()),
    [navigation],
  );
  return (
    <Background>
      <Header>
        <BackButton onPress={() => nav.goBack()} />
        <Title>Receive</Title>
        <IconButton />
      </Header>
      <MainContent style={styles.wrapper}>
        {store.receive.invoice ? <Address /> : <LargeSpinner />}
      </MainContent>
    </Background>
  );
};

const Address = () => (
  <View>
    <View style={styles.codeWrapper}>
      <Text style={styles.typeText}>
        {store.receiveTypeLabel}
      </Text>
      <QRCode size={260}>{store.receive.invoice}</QRCode>
      <Text style={styles.feeText} numberOfLines={1}>
        {store.receiveFeeLabel}
      </Text>
    </View>
    <BigButton icon="copy" onPress={() => receive.copyInvoice()}>
      {store.receiveCopyBtnLabel}
    </BigButton>
  </View>
);

export default observer(ReceiveScreen);
