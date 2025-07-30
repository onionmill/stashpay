import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import './action';
import * as nav from './action/nav';

import WalletScreen from './screen/wallet';
import ReceiveScreen from './screen/receive';
import ReceiveAmountScreen from './screen/receive-amount';
import ReceiveSuccessScreen from './screen/receive-success';
import PaymentListScreen from './screen/payment-list';
import PaymentListItemScreen from './screen/payment-list-item';
import RefundPaymentScreen from './screen/refund-payment';
import SendScreen from './screen/send';
import SendAddressScreen from './screen/send-address';
import SendAmountScreen from './screen/send-amount';
import SendConfirmScreen from './screen/send-confirm';
import SendSuccessScreen from './screen/send-success';
import SettingsScreen from './screen/settings';
import SeedBackupInfoScreen from './screen/seed-backup-info';
import SeedBackupScreen from './screen/seed-backup';
import SeedRestoreScreen from './screen/seed-restore';
import FiatSelectScreen from './screen/fiat-select';
import QrSelectScreen from './screen/qr-select';
import WaitScreen from './screen/wait';

const ReceiveStack = createNativeStackNavigator();
const SendStack = createNativeStackNavigator();
const SeedBackupStack = createNativeStackNavigator();
const PaymentListStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

const ReceiveStackScreen = () => (
  <ReceiveStack.Navigator>
    <ReceiveStack.Screen
      name="ReceiveAmount"
      component={ReceiveAmountScreen}
      options={{headerShown: false}}
    />
    <ReceiveStack.Screen
      name="Receive"
      component={ReceiveScreen}
      options={{headerShown: false}}
    />
  </ReceiveStack.Navigator>
);

const SendStackScreen = () => (
  <SendStack.Navigator>
    <SendStack.Screen
      name="Send"
      component={SendScreen}
      options={{headerShown: false}}
    />
    <SendStack.Screen
      name="SendAddress"
      component={SendAddressScreen}
      options={{headerShown: false}}
    />
    <SendStack.Screen
      name="SendAmount"
      component={SendAmountScreen}
      options={{headerShown: false}}
    />
    <SendStack.Screen
      name="SendConfirm"
      component={SendConfirmScreen}
      options={{headerShown: false}}
    />
    <SendStack.Screen
      name="SendWait"
      component={WaitScreen}
      options={{headerShown: false}}
    />
    <SendStack.Screen
      name="SendSuccess"
      component={SendSuccessScreen}
      options={{headerShown: false}}
    />
  </SendStack.Navigator>
);

const SeedBackupStackScreen = () => (
  <SeedBackupStack.Navigator>
    <SeedBackupStack.Screen
      name="SeedBackupInfo"
      component={SeedBackupInfoScreen}
      options={{headerShown: false}}
    />
    <SeedBackupStack.Screen
      name="SeedBackup"
      component={SeedBackupScreen}
      options={{headerShown: false}}
    />
  </SeedBackupStack.Navigator>
);

const PaymentListStackScreen = () => (
  <PaymentListStack.Navigator>
    <PaymentListStack.Screen
      name="PaymentList"
      component={PaymentListScreen}
      options={{headerShown: false}}
    />
    <PaymentListStack.Screen
      name="PaymentListItem"
      component={PaymentListItemScreen}
      options={{headerShown: false}}
    />
    <PaymentListStack.Screen
      name="RefundPayment"
      component={RefundPaymentScreen}
      options={{headerShown: false}}
    />
  </PaymentListStack.Navigator>
);

const App = () => (
  <NavigationContainer ref={navRef => nav.setTopLevelNavigator(navRef)}>
    <RootStack.Navigator screenOptions={{gestureEnabled: false}}>
      <RootStack.Screen
        name="Splash"
        component={WaitScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Main"
        component={WalletScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ReceiveStack"
        component={ReceiveStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SendStack"
        component={SendStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PaymentListStack"
        component={PaymentListStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SeedBackupStack"
        component={SeedBackupStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SeedRestoreStack"
        component={SeedRestoreScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="FiatSelect"
        component={FiatSelectScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="QrSelect"
        component={QrSelectScreen}
        options={{headerShown: false}}
      />
      <RootStack.Group screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen
          name="ReceiveSuccess"
          component={ReceiveSuccessScreen}
          options={{
            headerShown: false,
            animation: Platform.OS === 'android' ? 'fade_from_bottom' : undefined,
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  </NavigationContainer>
);

export default App;
