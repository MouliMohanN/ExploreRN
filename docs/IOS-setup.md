# iOS Setup Guide for ExploreRN

This document provides a comprehensive guide to set up iOS development for the ExploreRN React Native project.

## Prerequisites

- macOS (required for iOS development)
- Apple ID (for Xcode download)
- At least 15GB of free disk space for Xcode

## Current Project Status

✅ **Already Available:**
- iOS project structure exists in `ios/` directory
- React Native iOS scripts configured in `package.json`
- Command Line Tools installed
- Ruby available (for CocoaPods)

❌ **Needs Setup:**
- Xcode (full application)
- CocoaPods
- iOS dependencies installation
- iOS Simulator configuration

## Step 1: Installing Xcode

Xcode is Apple's integrated development environment (IDE) required for iOS development. It includes the iOS SDK, simulators, and build tools.

### Method 1: App Store Installation (Recommended)

1. **Open the Mac App Store**
   - Click the Apple menu → App Store
   - Or press `Cmd + Space` and search for "App Store"

2. **Search for Xcode**
   - In the App Store search bar, type "Xcode"
   - Look for the official Xcode app by Apple

3. **Download and Install**
   - Click "Get" or "Install" (it's free)
   - **Warning**: Xcode is large (~15GB), so ensure you have sufficient disk space and a stable internet connection
   - The download and installation may take 30-60 minutes depending on your internet speed

4. **Launch Xcode**
   - Once installed, open Xcode from Applications or Launchpad
   - Accept the license agreement
   - Xcode will install additional components on first launch

### Method 2: Developer Portal (Alternative)

If you prefer to download from Apple's developer portal:

1. Visit [https://developer.apple.com/xcode/](https://developer.apple.com/xcode/)
2. Click "Download" (requires Apple ID sign-in)
3. Download the .xip file and double-click to install

### Verification Steps

After Xcode installation, run these commands in Terminal to verify:

```bash
# Check Xcode installation
xcodebuild -version

# Check available simulators
xcrun simctl list devices

# Set Xcode as active developer directory (if needed)
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

Expected output for `xcodebuild -version`:
```
Xcode 15.x
Build version 15Xxx
```

## Next Steps

After Xcode installation is complete:

1. Install CocoaPods
2. Install iOS project dependencies
3. Configure iOS simulators
4. Test React Native iOS build

## Step 2: Installing CocoaPods

CocoaPods is a dependency manager for iOS projects, similar to npm for Node.js.

### Installation via Homebrew (Recommended)

```bash
# Install CocoaPods using Homebrew
brew install cocoapods

# Verify installation
pod --version
```

**Note**: We used Homebrew instead of `gem install cocoapods` because the system Ruby version (2.6.10) was too old for the latest CocoaPods requirements.

## Step 3: Install iOS Dependencies

After CocoaPods installation, install the iOS project dependencies:

```bash
# Navigate to iOS directory
cd ios

# Install dependencies
pod install
```

**Important**: After running `pod install`, always use the `.xcworkspace` file to open your project in Xcode, not the `.xcodeproj` file.

## Step 4: Configure Xcode Developer Directory

Ensure Xcode is set as the active developer directory:

```bash
# Set Xcode as active developer directory
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

# Verify configuration
xcodebuild -version
```

Expected output:
```
Xcode 26.0
Build version 17A324
```

## Step 5: Test iOS Simulator

Verify iOS simulators are available:

```bash
# List available simulators
xcrun simctl list devices
```

You should see various iPhone and iPad simulators listed.

## Step 6: Run React Native on iOS

Now you can run your React Native app on iOS:

```bash
# From project root directory
npm run ios

# Alternative command
react-native run-ios

# Run on specific simulator
react-native run-ios --simulator="iPhone 17 Pro"
```

## ✅ Setup Complete!

Your iOS development environment is now fully configured. The setup includes:

- ✅ Xcode 26.0 installed and configured
- ✅ CocoaPods 1.16.2 installed via Homebrew
- ✅ iOS project dependencies installed (84 total pods)
- ✅ iOS simulators available and working
- ✅ React Native app successfully building and running on iOS

## Available iOS Scripts

Your `package.json` includes these iOS-related scripts:

```bash
# Run app on iOS simulator
npm run ios

# Build iOS release version
npm run build:release:ios

# Build iOS debug version
npm run build:debug:ios

# Generate iOS fingerprint
npm run fingerprint:ios

# Run Detox tests on iOS
npm run detox:test:ios
```

## Troubleshooting

### Common Issues:

1. **"No bundle URL present"**:
   - Make sure Metro bundler is running: `npm start`
   - Reset Metro cache: `npm start -- --reset-cache`

2. **Build errors after adding new dependencies**:
   - Run `cd ios && pod install` to update iOS dependencies
   - Clean build: `cd ios && xcodebuild clean`

3. **Simulator not launching**:
   - Open Simulator app manually first
   - Try: `xcrun simctl list devices --json` to check simulator status

4. **Xcode license issues**:
   - Run: `sudo xcodebuild -license accept`

### Getting Help:

- [React Native iOS Setup Guide](https://reactnative.dev/docs/environment-setup)
- [CocoaPods Troubleshooting](https://guides.cocoapods.org/using/troubleshooting)
- [Xcode Documentation](https://developer.apple.com/documentation/xcode)

---

**Status**: ✅ **SETUP COMPLETE** - iOS development environment ready!
**Last Updated**: September 19, 2025
**Tested On**: 
- macOS Sequoia
- Xcode 26.0 (Build 17A324)
- CocoaPods 1.16.2
- React Native 0.80.1
