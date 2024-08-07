import React from 'react';
import {View, ScrollView, RefreshControl, StyleSheet} from 'react-native';

//
// Main Content
//

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 20,
  },
});

export const MainContent = ({children, style, refreshing, onRefresh}) => (
  <ScrollView
    contentContainerStyle={[styles.content, style]}
    keyboardShouldPersistTaps="handled"
    refreshControl={
      onRefresh ? (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      ) : null
    }>
    {children}
  </ScrollView>
);

//
// Spacer
//

const spacerStyles = StyleSheet.create({
  spacer: {
    flex: 1,
  },
});

export const Spacer = ({style}) => (
  <View style={[spacerStyles.spacer, style]} />
);
