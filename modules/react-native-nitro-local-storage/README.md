# react-native-nitro-local-storage

Nitro-powered local storage HybridObject that mirrors the `react-native-local-storage` TurboModule API while being callable from any Nitro-compatible runtime (e.g. Worklets).

## Installation

Because this package is consumed locally from the monorepo, add it to the app's `package.json` via a file reference:

```json
{
  "dependencies": {
    "react-native-nitro-local-storage": "file:./modules/react-native-nitro-local-storage"
  }
}
```

Then install pods and rebuild:

```bash
npm install
(cd ios && pod install)
```

## Usage

```ts
import { createNitroLocalStorage } from 'react-native-nitro-local-storage';

const storage = createNitroLocalStorage();

storage.setItem('value', 'key');
const value = storage.getItem('key');
storage.removeItem('key');
storage.clear();
```

The HybridObject is registered under the name `NitroLocalStorage`. Consumers may call `NitroModules.createHybridObject('NitroLocalStorage')` directly if they need lower-level access.

## Development

This package ships platform specific native code:

- **Android**: C++ + JNI helper backed by `SharedPreferences`
- **iOS**: Objective-C++ backed by `NSUserDefaults`

Re-run Gradle CMake sync after modifying files inside `android/src/main/cpp`.

```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

For iOS make sure to re-run `pod install` after editing the podspec.
