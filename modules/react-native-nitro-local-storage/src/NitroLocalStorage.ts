import type { HybridObject } from 'react-native-nitro-modules';
import { NitroModules, isRuntimeAlive } from 'react-native-nitro-modules';

const HYBRID_NAME = 'NitroLocalStorage';

export interface NitroLocalStorageHybrid extends HybridObject<{ ios: 'c++'; android: 'c++' }> {
  setItem(value: string, key: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}

let cachedInstance: NitroLocalStorageHybrid | null = null;

function assertNitroInstalled() {
  if (!isRuntimeAlive()) {
    throw new Error(
      '[react-native-nitro-local-storage] Nitro runtime is not installed. Make sure to call NitroModules.install() by importing "react-native-nitro-modules" before accessing Nitro HybridObjects.',
    );
  }
}

export function createNitroLocalStorage(): NitroLocalStorageHybrid {
  if (cachedInstance == null) {
    assertNitroInstalled();
    cachedInstance = NitroModules.createHybridObject<NitroLocalStorageHybrid>(HYBRID_NAME);
  }

  return cachedInstance;
}

export function getNitroLocalStorage(): NitroLocalStorageHybrid {
  return createNitroLocalStorage();
}

export const NitroLocalStorage = {
  create: createNitroLocalStorage,
  getInstance: createNitroLocalStorage,
  clearCache() {
    cachedInstance = null;
  },
};
