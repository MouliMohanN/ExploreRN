/* eslint-disable security/detect-object-injection */
type InMemoryStore<T> = {
  [key: string]: T | undefined;
};

const inMemoryStore: InMemoryStore = {};

export const InMemory = {
  /**
   * An in-memory store for data.
   * @template T The type of the value stored in the store.
   */

  /**
   * Sets a value in local storage.
   * @template T The type of the value to store.
   * @param {string} key The key to use for the value.
   * @param {T} value The value to store.
   * @returns {void}
   */
  set: <T>(key: string, value: T): void => {
    (inMemoryStore as InMemoryStore<T>)[key] = value;
  },
  get: <T>(key: string): T => {
    return inMemoryStore[key] as T;
  },

  remove: (key: string): void => {
    delete inMemoryStore[key];
  },
};
