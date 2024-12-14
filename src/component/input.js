import React, {Component} from 'react';
import {TextInput as RNTextInput, StyleSheet} from 'react-native';
import {font, color} from './style';

//
// Text Input
//

const baseStyles = StyleSheet.create({
  input: {
    color: color.black,
    fontSize: font.sizeL,
    height: font.lineHeightL + 2 * 12,
    padding: 0,
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
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: font.sizeXXL,
  },
});

export const AmountInput = ({style, ...props}) => (
  <TextInput style={[amountStyles.input, style]} {...props} />
);

