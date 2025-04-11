import React from 'react';
import {View, StyleSheet} from 'react-native';

import {color} from './style';
import {Text} from './text';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: color.bgGrey,
    height: 34,
    marginTop: 20,
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

export const Toggle = ({label1, label2, style}) => (
  <View style={[styles.wrapper, style]}>
    <View style={[styles.button, styles.btnActive]}>
      <Text style={[styles.label, styles.lblActive]}>{label1}</Text>
    </View>
    <View style={styles.button}>
      <Text style={styles.label}>{label2}</Text>
    </View>
  </View>
);
