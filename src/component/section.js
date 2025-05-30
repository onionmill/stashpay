import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {Text} from './text';
import {color, font} from './style';

const stylesSection = StyleSheet.create({
  wrapper: {
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontFamily: 'SFProDisplay-Medium',
    fontSize: font.sizeM,
    color: color.textFine,
    marginBottom: 25,
  },
});

export const Section = ({title, children}) => (
  <View style={stylesSection.wrapper}>
    <Text style={stylesSection.title}>{title}</Text>
    {children}
  </View>
);

const stylesSectionItem = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
});

export const SectionItem = ({title, onPress, icon, iconSize = 20, style}) => (
  <TouchableOpacity style={stylesSectionItem.wrapper} onPress={onPress}>
    <Text style={style}>{title}</Text>
    {icon ? (
      <Feather name={icon} size={iconSize} color={color.textFine} style={style} />
    ) : null}
  </TouchableOpacity>
);


