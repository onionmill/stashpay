/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {Feather} from '@react-native-vector-icons/feather';

import {Text} from './text';
import {color, font} from './style';
import {SmallSpinner} from './spinner';
import FlipIcon from '../asset/img/flip-icon';

//
// Link Button
//

const linkStyles = StyleSheet.create({
  touchable: {
    height: 20,
    borderBottomWidth: 1,
    borderColor: color.textFine,
  },
  text: {
    fontSize: font.sizeSub,
    lineHeight: font.lineHeightSub,
    color: color.textFine,
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
// Flip Button
//

const flipStyles = StyleSheet.create({
  touchable: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: font.sizeM,
    lineHeight: font.lineHeightM,
    color: color.textFine,
  },
  icon: {
    marginLeft: 5,
    fontSize: 21,
    color: color.textFine,
  },
});

export const FlipButton = ({onPress, disabled, label, style}) => (
  <TouchableOpacity
    style={[flipStyles.touchable, style]}
    disabled={disabled}
    onPress={onPress}>
    <Text style={flipStyles.label}>{label}</Text>
    <FlipIcon style={flipStyles.icon} />
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

export const IconButton = ({onPress, disabled, alert, iconName, iconColor, iconSize, style}) => (
  <TouchableOpacity
    style={[{opacity: disabled ? 0.5 : 1}, iconStyles.touchable, style]}
    disabled={disabled}
    onPress={onPress}>
    <Feather name={iconName} size={iconSize || 22} color={iconColor || color.textBase} />
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

export const AlertBubble = ({style}) => {
  const opacity = new Animated.Value(0.5);
  Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, {toValue: 1.0, duration: 1000, useNativeDriver: true}),
      Animated.timing(opacity, {toValue: 0.5, duration: 1000, useNativeDriver: true}),
    ])
  ).start();
  return (
    <Animated.View style={[{ opacity }, style]}>
      <View style={alertStyles.bubble} />
    </Animated.View>
  );
};

//
// Back Button
//

export const BackButton = ({onPress, style}) => (
  <IconButton
    iconName={'chevron-left'}
    onPress={onPress}
    style={style}
  />
);

//
// Close Button
//

export const CloseButton = ({onPress, style}) => (
  <IconButton
    iconName={'x'}
    onPress={onPress}
    style={style}
  />
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
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: color.textBase,
    fontSize: font.sizeM,
  },
  text: {
    fontSize: font.sizeM,
    lineHeight: font.lineHeightM,
  },
});

export const BigButton = ({ onPress, processing, disabled, icon, children, style }) => (
  <TouchableOpacity
    style={[
      { backgroundColor: disabled ? color.borderGrey : color.neutralTertiary },
      bigStyles.touchable,
      style,
    ]}
    disabled={disabled || processing}
    onPress={onPress}
  >
    {
      processing ?
      <SmallSpinner color={color.textBase}/> :
      (
        <View style={bigStyles.wrapper}>
          {icon ? <Feather name={icon} style={bigStyles.icon} /> : null}
          <Text style={[bigStyles.text, { color: disabled ? color.textDisabled : color.textBase }]}>
            {children}
          </Text>
        </View>
      )
    }
  </TouchableOpacity>
);
