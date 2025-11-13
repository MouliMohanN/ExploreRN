module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: './android',
        packageImportPath:
          'import com.reactnativenitrolocalstorage.NitroLocalStoragePackage;',
        packageInstance: 'new NitroLocalStoragePackage()',
      },
      ios: {},
    },
  },
}
