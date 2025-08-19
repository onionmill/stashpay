import React from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {color, font} from '../component/style';
import {Text, Title} from '../component/text';
import {Header} from '../component/layout';
import {Background} from '../component/background';
import {IconButton, BackButton, AlertBubble} from '../component/button';

import store from '../store';
import * as nav from '../action/nav';
import {selectPayment} from '../action/payment';
import {toSatLabel, toFiatLabel} from '../util';

const styles = StyleSheet.create({
  list: {
  },
  item: {
    padding: 7,
    marginBottom: 10,
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
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alert: {
    marginRight: 5,
  },
  descriptionWrapper: {
    flex: 1,
    paddingRight: 20,
  },
});

const Item = ({item}) => (
  <TouchableOpacity style={styles.item} onPress={() => selectPayment(item)}>
    <View style={styles.row}>
      <View style={styles.title}>
        {
          (item.status === 'pending' ||
          item.status === 'refundable' ||
          item.status === 'refundPending') ?
          (<AlertBubble style={styles.alert} />) : null
        }
        <Text style={styles.text}>
          {item.paymentType === 'send' ? 'Payment' : 'Received Payment'}
          {item.status === 'pending' ? ' (pending)' :
            item.status === 'refundable' ? ' (refundable)' :
            item.status === 'refundPending' ? ' (refunding)' :
            item.status === 'failed' ? ' (failed)' : ''}
        </Text>
      </View>
      <Text style={[
          {color: item.paymentType === 'send' ? color.textBase : color.green},
          styles.text,
        ]}>
        {item.paymentType === 'send' ? '-' : '+'}
        {toSatLabel(
          item.paymentType === 'send' ?
          item.amountSat + item.feesSat :
          item.amountSat
        )}
      </Text>
    </View>
    <View style={styles.row}>
      <View style={styles.descriptionWrapper}>
        <Text
          style={[styles.text, styles.secondary]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {item.details.description.trim() || 'No description'}
        </Text>
      </View>
      <Text style={[styles.text, styles.secondary]}>
        {toFiatLabel(
          item.paymentType === 'send' ?
          item.amountSat + item.feesSat :
          item.amountSat,
          store.settings
        )}
      </Text>
    </View>
  </TouchableOpacity>
);

const emptyStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '50%',
  },
  text: {
    color: color.textFine,
  },
});

const EmptyList = () => (
  <View style={emptyStyles.wrapper}>
    <Text style={emptyStyles.text}>
      No payments here yet.
    </Text>
  </View>
);

const PaymentListScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Payments</Title>
      <IconButton />
    </Header>
    {store.payments.length ? (
      <FlatList
        style={styles.list}
        data={store.payments}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.txId || item.timestamp}
      />
    ) : (
      <EmptyList />
    )}
  </Background>
);

export default observer(PaymentListScreen);
