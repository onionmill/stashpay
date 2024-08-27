import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {font} from './style';

//
// Base Text
//

const baseStyles = StyleSheet.create({
  text: {
    fontSize: font.sizeBase,
    lineHeight: font.lineHeightBase,
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
  },
});

export const H1Text = ({children, style}) => (
  <Text style={[h1Styles.text, style]}>{children}</Text>
);
