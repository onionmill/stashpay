/* eslint-disable react-native/no-inline-styles */
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
    style={[{opacity: disabled ? 0.5 : 1}, arrowUpStyles.touchable, style]}
    disabled={disabled}
    onPress={onPress}>
    <Feather name={'chevron-up'} size={30} color={color.darkGrey} />
  </TouchableOpacity>
);

//
// Icon Button
//

const iconStyles = StyleSheet.create({
  touchable: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const IconButton = ({onPress, disabled, iconName, style}) => (
  <TouchableOpacity
    style={[{opacity: disabled ? 0.5 : 1}, iconStyles.touchable, style]}
    disabled={disabled}
    onPress={onPress}>
    <Feather name={iconName} size={25} color={color.darkerGrey} />
  </TouchableOpacity>
);

//
// Glas Button
//

const glasStyles = StyleSheet.create({
  touchable: {
    height: 75,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    letterSpacing: 1,
    fontSize: font.sizeL,
    lineHeight: font.lineHeightL,
    fontWeight: 'bold',
  },
});

export const GlasButton = ({ onPress, disabled, children, style }) => (
  <TouchableOpacity
    style={[
      { backgroundColor: disabled ? color.glasDark : color.lightGrey },
      glasStyles.touchable,
      style,
    ]}
    disabled={disabled}
    onPress={onPress}
  >
    <Text style={[{ opacity: disabled ? 0.5 : 1 }, glasStyles.text]}>
      {children}
    </Text>
  </TouchableOpacity>
);
