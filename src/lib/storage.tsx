import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const mmkvStorage = {
  getItem<T>(key: string): T {
    const value = storage.getString(key);
    return value ? JSON.parse(value) || null : null;
  },
  setItem<T>(key: string, value: T) {
    storage.set(key, JSON.stringify(value));
  },
  removeItem(key: string) {
    storage.delete(key);
  }
};