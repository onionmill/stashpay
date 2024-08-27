import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

import './action';
import * as nav from './action/nav';

import SplashScreen from './screen/splash';
import WalletScreen from './screen/wallet';
import ReceiveScreen from './screen/receive';
import SendAddressScreen from './screen/send-address';
import SendAmountScreen from './screen/send-amount';
import SendConfirmScreen from './screen/send-confirm';
import SendSuccessScreen from './screen/send-success';
import SettingsScreen from './screen/settings';
import SeedBackupScreen from './screen/seed-backup';
import SeedRestoreScreen from './screen/seed-restore';
import WaitScreen from './screen/wait';

const SendStack = createNativeStackNavigator();
const SeedRestoreStack = createNativeStackNavigator();
const MainStack = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

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
        name="Main"
        component={MainStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SeedBackup"
        component={SeedBackupScreen}
        options={{title: 'Backup', headerBackTitle: 'Back'}}
      />
      <RootStack.Screen
        name="SeedRestoreStack"
        component={SeedRestoreScreen}
        options={{title: 'Recovery', headerBackTitle: 'Cancel'}}
      />
      <RootStack.Screen
        name="SendStack"
        component={SendStackScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default App;
