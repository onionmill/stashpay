import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

//
// Small Spinner
//

const smallStyles = StyleSheet.create({
  spinner: {
    transform: [{scale: 1.0}],
  },
});

export const SmallSpinner = ({...props}) => (
  <ActivityIndicator size="small" style={smallStyles.spinner} {...props} />
);

//
// Large Spinner
//

const largeStyles = StyleSheet.create({
  spinner: {
    transform: [{scale: 1.5}],
  },
});

export const LargeSpinner = ({...props}) => (
  <ActivityIndicator size="large" style={largeStyles.spinner} {...props} />
);
