// Lightweight storage wrapper for screens.
// Prefer MMKV (fast, sync) when available. If not, fall back to AsyncStorage (if installed),
// otherwise use a simple in-memory store. The wrapper exposes async getItem/setItem/removeItem
// so callers don't need to know the underlying implementation.

import type { MMKV } from 'react-native-mmkv';

let mmkv: MMKV | null = null;
try {
  // try to initialize MMKV if it's installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MMKV: MMKVImpl } = require('react-native-mmkv');
  mmkv = new MMKVImpl();
} catch (e) {
  mmkv = null;
}

const inMemoryStore: Record<string, string> = {};

// Synchronous API
export function getItem(key: string): string | null {
  if (mmkv) {
    try {
      const value = mmkv.getString(key);
      return value ?? null;
    } catch (e) {
      // fallthrough to in-memory
    }
  }
  return inMemoryStore[key] ?? null;
}

export function setItem(key: string, value: string): void {
  if (mmkv) {
    try {
      mmkv.set(key, value);
      return;
    } catch (e) {
      // fallthrough to in-memory
    }
  }
  inMemoryStore[key] = value;
}

export function removeItem(key: string): void {
  if (mmkv) {
    try {
      mmkv.delete(key);
      return;
    } catch (e) {
      // fallthrough
    }
  }
  delete inMemoryStore[key];
}

export default { getItem, setItem, removeItem };
