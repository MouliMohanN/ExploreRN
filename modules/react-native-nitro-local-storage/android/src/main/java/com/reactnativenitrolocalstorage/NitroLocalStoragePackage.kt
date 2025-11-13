package com.reactnativenitrolocalstorage

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class NitroLocalStoragePackage : ReactPackage {
  init {
    NitroLocalStorageLoader.ensure()
  }

  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    NitroLocalStorageLoader.ensure()
    return emptyList()
  }

  override fun createViewManagers(
    reactContext: ReactApplicationContext,
  ): List<ViewManager<*, *>> = emptyList()
}
