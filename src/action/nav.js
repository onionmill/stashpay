import {CommonActions, StackActions} from '@react-navigation/native';
import store from '../store';

let _navigatorRef;

export function setTopLevelNavigator(navigatorRef) {
  _navigatorRef = navigatorRef;
  store.navReady = true;
}

export function goBack() {
  _navigatorRef.dispatch(StackActions.pop());
}

export function goBackTo(name, params) {
  _navigatorRef.dispatch(StackActions.popTo(name, params));
}

export function goTo(name, params) {
  _navigatorRef.dispatch(StackActions.push(name, params));
}

export function reset(name) {
  _navigatorRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name}],
    }),
  );
}
