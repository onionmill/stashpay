import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {font, color} from './style';

//
// Base Text
//

const baseStyles = StyleSheet.create({
  text: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: font.sizeBase,
    lineHeight: font.lineHeightBase,
    color: color.textBase,
  },
});

export const Text = ({children, style, ...props}) => (
  <RNText style={[baseStyles.text, style]} {...props}>
    {children}
  </RNText>
);

//
// Title
//

const titleStyles = StyleSheet.create({
  text: {
    fontSize: font.sizeXL,
    lineHeight: font.lineHeightXL,
  },
});

export const Title = ({children, style}) => (
  <Text style={[titleStyles.text, style]}>
    {children}
  </Text>
);

//
// H1 Text
//

const h1Styles = StyleSheet.create({
  text: {
    marginTop: 14,
    fontFamily: 'SFProDisplay-Bold',
    fontSize: font.sizeXXL,
    lineHeight: font.lineHeightXXL,
  },
});

export const H1Text = ({children, style}) => (
  <Text style={[h1Styles.text, style]}>{children}</Text>
);

//
// Error Label
//

const errorStyles = StyleSheet.create({
  text: {
    marginTop: 8,
    fontFamily: 'SFProDisplay-Medium',
    alignSelf: 'center',
  },
});

export const ErrorLabel = ({children, error, style}) => (
  <Text style={[
    errorStyles.text,
    {color: error ? color.textError : color.textFine},
    style,
  ]}>
    {children}
  </Text>
);
