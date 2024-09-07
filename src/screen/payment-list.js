import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react';

import {color, font} from '../component/style';

import store from '../store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
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
});

const Item = ({item}) => (
  <View style={styles.item}>
    <Text style={styles.text}>Type: {item.paymentType}</Text>
    <Text style={styles.text}>Amount: {item.paymentType === 'send' ? '-' : ''}{item.amountSat} sats</Text>
    <Text style={styles.text}>Fee: {item.feesSat} sats</Text>
    <Text style={styles.text}>Status: {item.status}</Text>
    <Text style={styles.text}>Time: {new Date(item.timestamp * 1000).toLocaleString()}</Text>
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
