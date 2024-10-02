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
import ReceiveAmountScreen from './screen/receive-amount';
import ReceiveSuccessScreen from './screen/receive-success';
import PaymentListScreen from './screen/payment-list';
import SendAddressScreen from './screen/send-address';
import SendAmountScreen from './screen/send-amount';
import SendConfirmScreen from './screen/send-confirm';
import SendSuccessScreen from './screen/send-success';
import SettingsScreen from './screen/settings';
import SeedBackupInfoScreen from './screen/seed-backup-info';
import SeedBackupScreen from './screen/seed-backup';
import SeedRestoreScreen from './screen/seed-restore';
import WaitScreen from './screen/wait';

const ReceiveStack = createNativeStackNavigator();
const SendStack = createNativeStackNavigator();
const SeedBackupStack = createNativeStackNavigator();
const MainStack = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const ReceiveStackScreen = () => (
  <ReceiveStack.Navigator>
    <ReceiveStack.Screen
      name="ReceiveAmount"
      component={ReceiveAmountScreen}
      options={{headerShown: false}}
    />
  </ReceiveStack.Navigator>
);

const SendStackScreen = () => (
  <SendStack.Navigator>
    <SendStack.Screen
      name="SendAmount"
      component={SendAmountScreen}
      options={{
        title: 'Amount',
        headerLeft: () => (
          <Button title="Back" onPress={() => nav.goBack()} />
        ),
      }}
    />
    <SendStack.Screen
      name="SendConfirm"
      component={SendConfirmScreen}
      options={{
        title: 'Confirm',
        headerLeft: () => (
          <Button title="Back" onPress={() => nav.goBack()} />
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
    <MainStack.Screen
      name="Receive"
      component={ReceiveScreen}
      options={{
        headerRight: () => (
          <Button title="Amount" onPress={() => nav.goTo('ReceiveStack')} />
        ),
      }}
    />
    <MainStack.Screen name="Send" component={SendAddressScreen} />
    <MainStack.Screen name="Settings" component={SettingsScreen} />
  </MainStack.Navigator>
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
        component={MainStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SeedBackupStack"
        component={SeedBackupStackScreen}
        options={{title: 'Backup', headerBackTitle: 'Back'}}
      />
      <RootStack.Screen
        name="SeedRestoreStack"
        component={SeedRestoreScreen}
        options={{title: 'Recovery', headerBackTitle: 'Cancel'}}
      />
      <RootStack.Screen
        name="ReceiveStack"
        component={ReceiveStackScreen}
        options={{title: 'Amount', headerBackTitle: 'Back'}}
      />
      <RootStack.Screen
        name="SendStack"
        component={SendStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Group screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen
          name="ReceiveSuccess"
          component={ReceiveSuccessScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="PaymentList"
          component={PaymentListScreen}
          options={{
            title: 'Payments',
            headerLeft: () => (
              <Button title="Back" onPress={() => nav.goBack()} />
            ),
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  </NavigationContainer>
);

export default App;
