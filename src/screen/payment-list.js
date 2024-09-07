import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react';

import {color, font} from '../component/style';

import store from '../store';
import {formatDate, formatNumber} from '../util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 7,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.lightGrey,
    backgroundColor: color.white,
  },
  text: {
    fontSize: font.sizeM,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
});

const Item = ({item}) => (
  <View style={styles.item}>
    <View style={styles.row}>
      <Text style={[{color: item.paymentType === 'send' ? 'red' : 'green'}, styles.text]}>
        {item.paymentType === 'send' ? '-' : '+'}{formatNumber(item.amountSat)} sats
      </Text>
      <Text style={styles.text}>{formatDate(item.timestamp)}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.text}>Fee: {formatNumber(item.feesSat)} sats</Text>
      <Text style={styles.text}>{item.status}</Text>
    </View>
  </View>
);

const PaymentListScreen = () => (
  <View style={styles.container}>
    <FlatList
      data={store.payments}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.txId}
    />
  </View>
);

export default observer(PaymentListScreen);