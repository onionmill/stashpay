import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {font, color} from './style';

//
// Base Text
//

const baseStyles = StyleSheet.create({
  text: {
    fontSize: font.sizeBase,
    lineHeight: font.lineHeightBase,
    color: color.black,
  },
});

export const Text = ({children, style, ...props}) => (
  <RNText style={[baseStyles.text, style]} {...props}>
    {children}
  </RNText>
);

//
// H1 Text
//

const h1Styles = StyleSheet.create({
  text: {
    fontSize: font.sizeXL,
    lineHeight: font.lineHeightsXL,
    color: color.black,
  },
});

export const H1Text = ({children, style}) => (
  <Text style={[h1Styles.text, style]}>{children}</Text>
);
