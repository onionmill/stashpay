/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {Text} from './text';
import {color, font} from './style';
import {SmallSpinner} from './spinner';

//
// Button
//

const btnStyles = StyleSheet.create({
  touchable: {
    paddingRight: Platform.OS === 'android' ? 10 : null,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: font.sizeM,
    lineHeight: font.lineHeightM,
  },
});

export const Button = ({onPress, disabled, title, color: clr, style}) => (
  <TouchableOpacity
    style={[btnStyles.touchable, style]}
    disabled={disabled}
    onPress={onPress}>
    <Text style={[btnStyles.text, {color: clr || color.blue}]}>{title}</Text>
  </TouchableOpacity>
);

//
// Link Button
//

const linkStyles = StyleSheet.create({
  touchable: {
    height: 20,
    borderBottomWidth: 1,
    borderColor: color.darkGrey,
  },
  text: {
    fontSize: font.sizeSub,
    lineHeight: font.lineHeightSub,
    color: color.darkGrey,
  },
});

export const LinkButton = ({onPress, disabled, title, style}) => (
  <TouchableOpacity
    style={[linkStyles.touchable, style]}
    disabled={disabled}
    onPress={onPress}>
    <Text style={linkStyles.text}>{title}</Text>
  </TouchableOpacity>
);

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

export const PillButton = ({onPress, processing, disabled, children, style}) => (
  <TouchableOpacity
    style={[{opacity: disabled ? 0.5 : 1}, pillStyles.touchable, style]}
    disabled={disabled || processing}
    onPress={onPress}>
    {
      processing ?
      <SmallSpinner color={color.white}/> :
      <Text style={pillStyles.text}>{children}</Text>
    }
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
  alert: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export const IconButton = ({onPress, disabled, alert, iconName, style}) => (
  <TouchableOpacity
    style={[{opacity: disabled ? 0.5 : 1}, iconStyles.touchable, style]}
    disabled={disabled}
    onPress={onPress}>
    <Feather name={iconName} size={22} color={color.textBase} />
    {alert ? <AlertBubble style={iconStyles.alert} /> : null}
  </TouchableOpacity>
);

//
// Alert Bubble
//

const alertStyles = StyleSheet.create({
  bubble: {
    height: 14,
    width: 14,
    borderRadius: 14 / 2,
    backgroundColor: color.warning,
    borderWidth: 2,
    borderColor: color.white,
  },
});

export const AlertBubble = ({style}) => (
  <View style={[alertStyles.bubble, style]} />
);

//
// Big Button
//

const bigStyles = StyleSheet.create({
  touchable: {
    height: 54,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: font.sizeM,
    lineHeight: font.lineHeightM,
  },
});

export const BigButton = ({ onPress, processing, disabled, children, style }) => (
  <TouchableOpacity
    style={[
      { backgroundColor: disabled ? color.disabled : color.neutralTertiary },
      bigStyles.touchable,
      style,
    ]}
    disabled={disabled || processing}
    onPress={onPress}
  >
    {
      processing ?
      <SmallSpinner color={color.textBase}/> :
      <Text style={[bigStyles.text, { color: disabled ? color.textDisabled : color.textBase }]}>
        {children}
      </Text>
    }
  </TouchableOpacity>
);
