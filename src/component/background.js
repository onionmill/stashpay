import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

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

export const Background = ({color = clr.white, form, children, style}) => (
  <SafeAreaView style={[{backgroundColor: color}, styles.safe]}>
    {
      form ?
      <FormWrapper style={style}>{children}</FormWrapper> :
      <View style={[styles.wrapper, style]}>{children}</View>
    }
  </SafeAreaView>
);

//
// FormWrapper
//

const formStyles = StyleSheet.create({
  avoid: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});

export const FormWrapper = ({children, style}) => (
  <KeyboardAvoidingView
    style={formStyles.avoid}
    behavior={Platform.OS === 'android' ? null : 'padding'}>
    <View style={[formStyles.wrapper, style]}>
      {children}
    </View>
  </KeyboardAvoidingView>
);
