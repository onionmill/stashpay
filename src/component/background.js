import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

//
// Background
//

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export const Background = ({color, children, style}) => (
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
    <StatusBar barStyle="dark-content" />
    <KeyboardAvoidingView
      style={wrapperStyles.avoid}
      behavior={Platform.OS === 'android' ? null : 'padding'}>
      <View style={[wrapperStyles.wrapper, style]}>
        {children}
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
