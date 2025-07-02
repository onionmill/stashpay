import React from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {color, font} from '../component/style';
import {Text, Title} from '../component/text';
import {Header} from '../component/layout';
import {Background} from '../component/background';
import {IconButton, BackButton} from '../component/button';

import store from '../store';
import * as nav from '../action/nav';
import {openExplorer} from '../action/payment';
import {formatDate, formatNumber, toSatLabel, toFiatLabel} from '../util';

const styles = StyleSheet.create({
  list: {
    marginTop: 7,
  },
  item: {
    padding: 7,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.lightGrey,
    backgroundColor: color.white,
  },
  text: {
    fontSize: font.sizeM,
  },
  secondary: {
    color: color.textFine,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
});

const Item = ({item}) => (
  <TouchableOpacity style={styles.item} onPress={() => openExplorer(item)}>
    <View style={styles.row}>
      <Text style={[{color: item.paymentType === 'send' ? color.textBase : color.green}, styles.text]}>
        {item.paymentType === 'send' ? '-' : ''}
        {toFiatLabel(item.amountSat, store.settings)}
      </Text>
      <Text style={styles.text}>
        {formatDate(item.timestamp)}
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={[styles.text, styles.secondary]}>
        {toSatLabel(item.amountSat)}
        {item.feesSat ? ` (fee ${formatNumber(item.feesSat)})` : ''}
      </Text>
      <Text style={[styles.text, styles.secondary]}>
        {item.status}
      </Text>
    </View>
  </TouchableOpacity>
);

const PaymentListScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Payments</Title>
      <IconButton/>
    </Header>
    <FlatList
      style={styles.list}
      data={store.payments}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.txId}
    />
  </Background>
);

export default observer(PaymentListScreen);
