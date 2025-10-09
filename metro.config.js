const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Enable package exports so Metro can resolve packages using their modern "exports" field
    // (React 18/19 use `exports` and Metro may need this flag enabled for correct resolution).
    unstable_enablePackageExports: true,
  },
};

module.exports = mergeConfig(defaultConfig, config);
