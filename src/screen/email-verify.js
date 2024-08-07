import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';

import {H1Text} from '../component/text';
import {TextInput} from '../component/input';
import {PillButton} from '../component/button';
import {MainContent, Spacer} from '../component/layout';
import {Background} from '../component/background';

import store from '../store';
import * as userId from '../action/user-id';

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
  btnWrapper: {
    marginTop: 30,
    height: 150,
  },
});

const EmailVerifyScreen = ({route}) => (
  <Background>
    <MainContent>
      <H1Text>Enter the code sent to {store.userId.email}</H1Text>
      <TextInput
        placeholder="code"
        keyboardType="number-pad"
        autoFocus
        style={styles.input}
        value={store.userId.code}
        onChangeText={code => userId.setCode(code)}
      />
      <Spacer />
      <View style={styles.btnWrapper}>
        <PillButton onPress={() => route.params.onNext()}>Next</PillButton>
      </View>
    </MainContent>
  </Background>
);

export default observer(EmailVerifyScreen);
