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
  background: {
    flex: 1,
  },
});

export const Background = ({color = clr.white, children, style}) => (
  <View style={[{backgroundColor: color}, styles.background]}>
    <ContentWrapper style={style}>{children}</ContentWrapper>
  </View>
);

//
// ContentWrapper
//

const wrapperStyles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  avoid: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});

export const ContentWrapper = ({children, style}) => (
  <SafeAreaView style={wrapperStyles.safe}>
    <KeyboardAvoidingView
      style={wrapperStyles.avoid}
      behavior={Platform.OS === 'android' ? null : 'padding'}>
      <View style={[wrapperStyles.wrapper, style]}>
        {children}
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
