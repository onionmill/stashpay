import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {color as clr} from './style';

//
// Background
//

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});

export const Background = ({color = clr.white, keyboardAvoid, children, style}) => (
  <SafeAreaView style={[{backgroundColor: color}, styles.safe]}>
    {
      keyboardAvoid ? (
        <KeyboardAvoidWrapper style={style}>{children}</KeyboardAvoidWrapper>
      ) : (
        <View style={[styles.wrapper, style]}>{children}</View>
      )
    }
  </SafeAreaView>
);

//
// KeyboardAvoidWrapper
//

const wrapperStyles = StyleSheet.create({
  avoid: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});

export const KeyboardAvoidWrapper = ({children, style}) => (
  <KeyboardAvoidingView
    style={wrapperStyles.avoid}
    behavior="padding">
    <View style={[wrapperStyles.wrapper, style]}>
      {children}
    </View>
  </KeyboardAvoidingView>
);
