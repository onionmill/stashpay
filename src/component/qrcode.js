import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNQRCode from 'react-native-qrcode-svg';
import {color} from './style';

const styles = StyleSheet.create({
  base: {
    padding: 30,
    borderRadius: 13,
    backgroundColor: color.white,
  },
});

export const QRCode = ({children = '', size = 180, style}) => {
  return (
    <View style={[styles.base, style]}>
      <RNQRCode value={children} size={size} />
    </View>
  );
};
