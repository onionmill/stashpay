import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from './text';
import {color, font} from './style';

//
// Pill Button
//

const pillStyles = StyleSheet.create({
  touchable: {
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 58.94,
    backgroundColor: color.blue,
  },
  text: {
    letterSpacing: 1,
    fontSize: font.sizeL,
    lineHeight: font.lineHeightBase,
    color: color.white,
  },
});

export const PillButton = ({onPress, disabled, children, style}) => (
  <TouchableOpacity
    style={[{opacity: disabled ? 0.5 : 1}, pillStyles.touchable, style]}
    disabled={disabled}
    onPress={onPress}>
    <Text style={pillStyles.text}>{children}</Text>
  </TouchableOpacity>
);
