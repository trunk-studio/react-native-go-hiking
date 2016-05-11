import { AsyncStorage } from 'react-native';

const STORAGE_PREFIX = '@App:';

export async function setItem(storageKey, srcValue = '') {
  let value = '';
  if (srcValue !== '' && srcValue !== null) {
    value = srcValue.toString();
  }
  return await AsyncStorage.setItem(STORAGE_PREFIX + storageKey, value);
}

export async function getItem(storageKey) {
  const response = await AsyncStorage.getItem(STORAGE_PREFIX + storageKey);
  if (response === 'true') {
    return true;
  } else if (response === 'false') {
    return false;
  }
  return response;
}

export async function removeItem(storageKey) {
  return await AsyncStorage.removeItem(STORAGE_PREFIX + storageKey);
}
