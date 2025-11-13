package com.reactnativenitrolocalstorage

import android.util.Log

internal object NitroLocalStorageLoader {
  private const val TAG = "NitroLocalStorage"
  @Volatile private var loaded = false

  @JvmStatic
  @Synchronized
  fun ensure() {
    if (loaded) {
      return
    }

    try {
      System.loadLibrary("nitro_local_storage")
      loaded = true
    } catch (error: UnsatisfiedLinkError) {
      Log.e(TAG, "Failed to load nitro_local_storage native library", error)
      throw error
    }
  }
}
