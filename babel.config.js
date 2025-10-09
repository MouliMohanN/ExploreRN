module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'babel-plugin-react-compiler',
      {
        target: '19', // React version
        // Optional: enable only in production
        // runtimeModule: 'react-compiler-runtime'
      },
    ],
  ],
};
