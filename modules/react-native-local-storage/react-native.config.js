module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: './android',
        packageImportPath: 'import com.reactnativelocalstorage.NativeLocalStoragePackage;',
        packageInstance: 'new NativeLocalStoragePackage()',
      },
      ios: {},
    },
  },
};
