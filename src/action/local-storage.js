import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem(key, value) {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
}

export async function getItem(key) {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export async function removeItem(key) {
  return AsyncStorage.removeItem(key);
}
