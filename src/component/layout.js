import React from 'react';
import {View, ScrollView, RefreshControl, StyleSheet} from 'react-native';

//
// Main Content
//

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
  },
});

export const MainContent = ({children, style}) => (
  <View style={[styles.content, style]}>
    {children}
  </View>
);

//
// Header
//

const headerStyles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export const Header = ({children, style}) => (
  <View style={[headerStyles.content, style]}>
    {children}
  </View>
);

//
// Scroll Content
//

const scrollStyles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 24,
  },
});

export const ScrollContent = ({children, style, refreshing, onRefresh}) => (
  <ScrollView
    contentContainerStyle={[scrollStyles.content, style]}
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
