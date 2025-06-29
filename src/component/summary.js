import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Text} from './text';
import {color} from './style';

const stylesBox = StyleSheet.create({
  wrapper: {
    padding: 16,
    borderWidth: 1,
    borderColor: color.borderGrey,
    borderRadius: 8,
  },
});

export const SummaryBox = ({children, style}) => (
  <View style={[stylesBox.wrapper, style]}>
    {children}
  </View>
);

const stylesLabel = StyleSheet.create({
  label: {
    color: color.textFine,
  },
});

export const SummaryLabel = ({children, style}) => (
  <Text style={[stylesLabel.label, style]}>
    {children}
  </Text>
);

const stylesItem = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
  },
  top: {
    textAlign: 'right',
  },
  bottom: {
    textAlign: 'right',
    color: color.textFine,
  },
});

export const SummaryItem = ({top, bottom, style}) => (
  <View style={[stylesItem.wrapper, style]}>
    <Text style={stylesItem.top}>{top}</Text>
    <Text style={stylesItem.bottom}>{bottom}</Text>
  </View>
);

const stylesLine = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export const SummaryLine = ({children, style}) => (
  <View style={[stylesLine.wrapper, style]}>
    {children}
  </View>
);

const stylesTotal = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: color.borderGrey,
    paddingTop: 15,
  },
  label: {
    fontFamily: 'SFProDisplay-Bold',
    color: color.textBase,
  },
});

export const SummaryTotal = ({children, style}) => (
  <View style={[stylesTotal.wrapper, style]}>
    <SummaryLabel style={stylesTotal.label}>Total</SummaryLabel>
    {children}
  </View>
);
