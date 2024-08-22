import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

import './action';
import * as nav from './action/nav';

import SplashScreen from './screen/splash';
import PinSetScreen from './screen/pin-set';
import PinVerifyScreen from './screen/pin-verify';
import PinChangeCurrentScreen from './screen/pin-change-current';
import PinChangeNewScreen from './screen/pin-change-new';
import PinChangeVerifyScreen from './screen/pin-change-verify';
import PinCheckScreen from './screen/pin-check';
import RestoreScreen from './screen/restore';
import WalletScreen from './screen/wallet';
import ReceiveScreen from './screen/receive';
import SendAddressScreen from './screen/send-address';
import SendAmountScreen from './screen/send-amount';
import SendPsbtScreen from './screen/send-psbt';
import SendConfirmScreen from './screen/send-confirm';
import SendSuccessScreen from './screen/send-success';
import SettingsScreen from './screen/settings';
import EmailSetScreen from './screen/email-set';
import EmailPinScreen from './screen/email-pin';
import EmailVerifyScreen from './screen/email-verify';
import WaitScreen from './screen/wait';

const BackupStack = createNativeStackNavigator();
const SendStack = createNativeStackNavigator();
const PinChangeStack = createNativeStackNavigator();
const PinCheckStack = createNativeStackNavigator();
const RestoreStack = createNativeStackNavigator();
const EmailSetStack = createNativeStackNavigator();
const MainStack = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const BackupStackScreen = () => (
  <BackupStack.Navigator>
    <BackupStack.Screen
      name="BackupPinSet"
      component={PinSetScreen}
      options={{title: 'Set PIN'}}
    />
    <BackupStack.Screen
      name="BackupPinVerify"
      component={PinVerifyScreen}
      options={{title: 'Verify PIN'}}
    />
    <BackupStack.Screen
      name="BackupWait"
      component={WaitScreen}
      options={{headerShown: false}}
    />
  </BackupStack.Navigator>
);

const SendStackScreen = () => (
  <SendStack.Navigator>
    <SendStack.Screen
      name="SendAmount"
      component={SendAmountScreen}
      options={{
        title: 'Amount',
        headerLeft: () => (
          <Button title="Address" onPress={() => nav.goBack()} />
        ),
      }}
    />
    <SendStack.Screen
      name="SendPsbt"
      component={SendPsbtScreen}
      options={{
        title: 'Sign PSBT',
        headerLeft: () => (
          <Button title="Amount" onPress={() => nav.goBack()} />
        ),
      }}
    />
    <SendStack.Screen
      name="SendConfirm"
      component={SendConfirmScreen}
      options={{
        title: 'Confirm',
        headerLeft: () => (
          <Button title="Amount" onPress={() => nav.goTo('SendAmount')} />
        ),
        headerRight: () => (
          <Button title="Cancel" onPress={() => nav.goTo('Send')} />
        ),
      }}
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

const PinChangeStackScreen = () => (
  <PinChangeStack.Navigator>
    <PinChangeStack.Screen
      name="PinChangeCurrent"
      component={PinChangeCurrentScreen}
      options={{
        title: 'Enter Current PIN',
        headerLeft: () => (
          <Button title="Settings" onPress={() => nav.goBack()} />
        ),
      }}
    />
    <PinChangeStack.Screen
      name="PinChangeNew"
      component={PinChangeNewScreen}
      options={{title: 'Enter New PIN'}}
    />
    <PinChangeStack.Screen
      name="PinChangeVerify"
      component={PinChangeVerifyScreen}
      options={{title: 'Verify New PIN'}}
    />
    <BackupStack.Screen
      name="PinChangeWait"
      component={WaitScreen}
      options={{headerShown: false}}
    />
  </PinChangeStack.Navigator>
);

const PinCheckStackScreen = () => (
  <PinCheckStack.Navigator>
    <PinCheckStack.Screen
      name="PinCheck"
      component={PinCheckScreen}
      options={{title: 'Unlock Wallet'}}
    />
  </PinCheckStack.Navigator>
);

const RestoreStackScreen = () => (
  <RestoreStack.Navigator>
    <RestoreStack.Screen
      name="RestorePin"
      component={RestoreScreen}
      options={{title: 'Restore Wallet'}}
    />
    <RestoreStack.Screen
      name="RestoreWait"
      component={WaitScreen}
      options={{headerShown: false}}
    />
    <RestoreStack.Screen
      name="RestorePinResetCode"
      component={EmailVerifyScreen}
      options={{
        title: 'Verify PIN Reset',
        headerLeft: () => (
          <Button title="Restore" onPress={() => nav.goTo('RestorePin')} />
        ),
      }}
    />
    <RestoreStack.Screen
      name="RestorePinResetNewPin"
      component={PinChangeNewScreen}
      options={{title: 'Enter New PIN'}}
    />
    <RestoreStack.Screen
      name="RestorePinResetPinVerify"
      component={PinChangeVerifyScreen}
      options={{title: 'Verify New PIN'}}
    />
  </RestoreStack.Navigator>
);

const EmailSetStackScreen = () => (
  <EmailSetStack.Navigator>
    <EmailSetStack.Screen
      name="EmailSet"
      component={EmailSetScreen}
      options={{
        title: 'Set Email',
        headerLeft: () => (
          <Button title="Settings" onPress={() => nav.goBack()} />
        ),
      }}
    />
    <EmailSetStack.Screen
      name="EmailPin"
      component={EmailPinScreen}
      options={{title: 'Enter PIN'}}
    />
    <EmailSetStack.Screen
      name="EmailVerify"
      component={EmailVerifyScreen}
      options={{title: 'Verify Email'}}
    />
    <EmailSetStack.Screen
      name="EmailWait"
      component={WaitScreen}
      options={{headerShown: false}}
    />
  </EmailSetStack.Navigator>
);

const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Wallet') {
          iconName = 'list';
        } else if (route.name === 'Send') {
          iconName = 'send';
        } else if (route.name === 'Receive') {
          iconName = 'download';
        } else if (route.name === 'Settings') {
          iconName = 'settings';
        }
        return <Feather name={iconName} size={size} color={color} />;
      },
    })}>
    <MainStack.Screen name="Wallet" component={WalletScreen} />
    <MainStack.Screen name="Receive" component={ReceiveScreen} />
    <MainStack.Screen name="Send" component={SendAddressScreen} />
    <MainStack.Screen name="Settings" component={SettingsScreen} />
  </MainStack.Navigator>
);

const App = () => (
  <NavigationContainer ref={navRef => nav.setTopLevelNavigator(navRef)}>
    <RootStack.Navigator screenOptions={{gestureEnabled: false}}>
      <RootStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Backup"
        component={BackupStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Restore"
        component={RestoreStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PinCheck"
        component={PinCheckStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{title: 'Photon'}}
      />
      <RootStack.Screen
        name="SendStack"
        component={SendStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="EmailSetStack"
        component={EmailSetStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PinChangeStack"
        component={PinChangeStackScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default App;
