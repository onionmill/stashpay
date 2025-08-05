import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {observer} from 'mobx-react';

import {Title} from '../component/text';
import {
  SummaryBox,
  SummaryItem,
  SummaryLabel,
  SummaryLine,
  SummaryTotal,
} from '../component/summary';
import {QRCode} from '../component/qrcode';
import {BigButton, CloseButton, BackButton} from '../component/button';
import {LargeSpinner} from '../component/spinner';
import {Header, ScrollContent} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as nav from '../action/nav';
import * as receive from '../action/receive';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  codeWrapper: {
  },
  summaryWrapper: {
    marginVertical: 10,
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
        <CloseButton onPress={() => nav.goBackTo('Main')} />
      </Header>
      <ScrollContent style={styles.wrapper}>
        {store.receive.invoice ? <Address /> : <LargeSpinner />}
      </ScrollContent>
    </Background>
  );
};

const Address = () => (
  <View style={styles.addressWrapper}>
    <View style={styles.codeWrapper}>
      <QRCode size={Dimensions.get('window').width - 2 * 30}>
        {store.receive.invoice}
      </QRCode>
    </View>
    <Summary />
    <ShareCopyButton
      onShare={() => receive.shareInvoice()}
      onCopy={() => receive.copyInvoice()}
    />
  </View>
);

const Summary = () => (
  <SummaryBox style={styles.summaryWrapper}>
    <SummaryLine>
      <SummaryLabel>Amount</SummaryLabel>
      <SummaryItem
        top={store.receiveAmountSatLabel}
        bottom={store.receiveAmountFiatLabel}
      />
    </SummaryLine>
    <SummaryLine>
      <SummaryLabel>Network Fees (estimate)</SummaryLabel>
      <SummaryItem
        top={store.receiveFeesSatLabel}
        bottom={store.receiveFeesFiatLabel}
      />
    </SummaryLine>
    <SummaryTotal>
      <SummaryItem
        top={store.receiveTotalSatLabel}
        bottom={store.receiveTotalFiatLabel}
      />
    </SummaryTotal>
  </SummaryBox>
);

const bigBtnStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  leftBtn: {
    flex: 1,
    marginRight: 8,
  },
  rightBtn: {
    flex: 1,
    marginLeft: 8,
  },
});

const ShareCopyButton = ({ onShare, onCopy }) => (
  <View style={bigBtnStyles.wrapper}>
    <BigButton icon="share" onPress={onShare} style={bigBtnStyles.leftBtn}>
      Share
    </BigButton>
    <BigButton icon="copy" onPress={onCopy} style={bigBtnStyles.rightBtn}>
      Copy
    </BigButton>
  </View>
);

export default observer(ReceiveScreen);
