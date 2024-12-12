import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

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
    lineHeight: font.lineHeightL,
    color: color.white,
  },
});

export const PillButton = ({onPress, disabled, children, style}) => (
  <TouchableOpacity
    // eslint-disable-next-line react-native/no-inline-styles
    style={[{opacity: disabled ? 0.5 : 1}, pillStyles.touchable, style]}
    disabled={disabled}
    onPress={onPress}>
    <Text style={pillStyles.text}>{children}</Text>
  </TouchableOpacity>
);

//
// Arrow Up Button
//

const arrowUpStyles = StyleSheet.create({
  touchable: {
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const ArrowUpButton = ({onPress, disabled, children, style}) => (
  <TouchableOpacity
    // eslint-disable-next-line react-native/no-inline-styles
    style={[{opacity: disabled ? 0.5 : 1}, arrowUpStyles.touchable, style]}
    disabled={disabled}
    onPress={onPress}>
    <Feather name={'chevron-up'} size={30} color={color.darkGrey} />
  </TouchableOpacity>
);
