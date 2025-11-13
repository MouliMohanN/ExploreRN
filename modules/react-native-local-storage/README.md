# react-native-local-storage

A Turbo Native Module providing LocalStorage functionality for React Native's New Architecture.

## Features

- ✅ **New Architecture (Turbo Module)** - Built with JSI for maximum performance
- ✅ **Synchronous API** - No callbacks or promises needed
- ✅ **Cross-Platform** - Works on iOS and Android
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Persistent Storage** - Uses NSUserDefaults (iOS) and SharedPreferences (Android)
- ✅ **Application-Level Settings** - Automatically uses your app's build configuration

## Installation

Since this is a local package in your monorepo:

```bash
# The package is automatically linked via your root package.json
cd ios && bundle exec pod install
```

## Usage

```typescript
import NativeLocalStorage from 'react-native-local-storage';

// Store a value
NativeLocalStorage.setItem('Hello World', 'myKey');

// Retrieve a value (synchronous!)
const value = NativeLocalStorage.getItem('myKey');
console.log(value); // "Hello World"

// Remove a specific item
NativeLocalStorage.removeItem('myKey');

// Clear all stored data
NativeLocalStorage.clear();
```

## API

### `setItem(value: string, key: string): void`

Stores a value with the given key.

### `getItem(key: string): string | null`

Retrieves the value for a given key. Returns `null` if the key doesn't exist.

**Note:** This is a synchronous method that returns immediately.

### `removeItem(key: string): void`

Removes the value associated with the given key.

### `clear(): void`

Removes all stored key-value pairs.

## Configuration

The library automatically uses your application's build settings:

- **Android**: Uses `compileSdkVersion`, `minSdkVersion`, `targetSdkVersion`, `kotlinVersion`, `buildToolsVersion`, `ndkVersion`, and `javaVersion` directly from root project
- **iOS**: Uses `min_ios_version_supported` from your Podfile

No additional configuration needed!

## Requirements

- React Native 0.82+
- New Architecture enabled (`newArchEnabled=true`)
- iOS 13.4+ (or your app's configured minimum version)
- Android minSdk 23+ (or your app's configured minimum version)

## License

MIT
