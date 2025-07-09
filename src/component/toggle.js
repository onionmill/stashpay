import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {color} from './style';
import {Text} from './text';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: color.bgGrey,
    height: 34,
    marginTop: 10,
    borderRadius: 8,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnActive: {
    backgroundColor: color.white,
    borderRadius: 8,
    margin: 2,
  },
  label: {
    fontFamily: 'SFProDisplay-Medium',
  },
  lblActive: {
    fontFamily: 'SFProDisplay-SemiBold',
  },
});

export const Toggle = ({label1, label2, value, onPress, style}) => (
  <View style={[styles.wrapper, style]}>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, value === '1' ? styles.btnActive : null]}>
      <Text style={[styles.label, value === '1' ? styles.lblActive : null]}>
        {label1}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, value === '2' ? styles.btnActive : null]}>
      <Text style={[styles.label, value === '2' ? styles.lblActive : null]}>
        {label2}
      </Text>
    </TouchableOpacity>
  </View>
);
