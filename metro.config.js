const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
// const {createSerializer} = require('react-native-bundle-discovery');

const defaultConfig = getDefaultConfig(__dirname);

// const mySerializer = createSerializer({
//   includeCode: true, // Set to true if you want to compare source/bundle code, but this will result in a larger report file.
//   projectRoot: __dirname, // In a monorepo, this should point to the monorepo root.
// });

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
  // serializer: {
  //   customSerializer: mySerializer,
  // },
};

module.exports = mergeConfig(defaultConfig, config);
