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
});

export const Background = ({color = clr.white, children, style}) => (
  <SafeAreaView style={[{backgroundColor: color}, styles.safe]}>
    <ContentWrapper style={style}>{children}</ContentWrapper>
  </SafeAreaView>
);

//
// ContentWrapper
//

const wrapperStyles = StyleSheet.create({
  avoid: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});

export const ContentWrapper = ({children, style}) => (
  <KeyboardAvoidingView
    style={wrapperStyles.avoid}
    behavior="padding">
    <View style={[wrapperStyles.wrapper, style]}>
      {children}
    </View>
  </KeyboardAvoidingView>
);
