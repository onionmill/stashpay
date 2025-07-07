import React, {Component} from 'react';
import {View, TextInput as RNTextInput, StyleSheet} from 'react-native';

import {Text} from './text';
import {font, color} from './style';

//
// Text Input
//

const baseStyles = StyleSheet.create({
  input: {
    fontFamily: 'SFProDisplay-Regular',
    color: color.textBase,
    fontSize: font.sizeL,
    height: font.lineHeightL + 2 * 12,
    padding: 0,
    textAlignVertical: 'top',
  },
});

export class TextInput extends Component {
  render() {
    const {style, ...props} = this.props;
    return (
      <RNTextInput
        style={[baseStyles.input, style]}
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={color.grey}
        underlineColorAndroid="rgba(0,0,0,0)"
        {...props}
      />
    );
  }
}

//
// Amount Input
//

const amountStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: font.lineHeightXXXXL,
  },
  prefix: {
    fontSize: font.sizeXXXXL,
    lineHeight: font.lineHeightXXXXL,
  },
  input: {
    fontSize: font.sizeXXXXL,
    height: 84,
    textAlignVertical: 'center',
  },
  suffix: {
    fontSize: font.sizeL,
    lineHeight: font.lineHeightL,
    alignSelf: 'flex-begin',
    paddingTop: 10,
  },
});

export const AmountInput = ({prefix, suffix, style, ...props}) => (
  <View style={[amountStyles.wrapper, style]}>
    <Text style={amountStyles.prefix}>{prefix}</Text>
    <TextInput
      autoFocus
      caretHidden
      placeholder="0"
      keyboardType="decimal-pad"
      placeholderTextColor={color.textBase}
      style={amountStyles.input}
      {...props}
    />
    <Text style={amountStyles.suffix}>{suffix}</Text>
  </View>
);

