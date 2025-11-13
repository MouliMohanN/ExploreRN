package com.reactnativenitrolocalstorage

import android.content.Context
import android.content.SharedPreferences
import com.margelo.nitro.NitroModules

internal object LocalStorageHelper {
  private const val SHARED_PREFERENCES_NAME = "LocalStorage"

  private val applicationContext: Context
    get() = NitroModules.applicationContext
      ?: error(
        "NitroModules.applicationContext is null. Call NitroModules.install() before using NitroLocalStorage."
      )

  private val preferences: SharedPreferences
    get() = applicationContext.getSharedPreferences(
      SHARED_PREFERENCES_NAME,
      Context.MODE_PRIVATE,
    )

  @JvmStatic
  fun setItem(value: String, key: String) {
    NitroLocalStorageLoader.ensure()
    preferences.edit().putString(key, value).apply()
  }

  @JvmStatic
  fun getItem(key: String): String? {
    NitroLocalStorageLoader.ensure()
    return preferences.getString(key, null)
  }

  @JvmStatic
  fun removeItem(key: String) {
    NitroLocalStorageLoader.ensure()
    preferences.edit().remove(key).apply()
  }

  @JvmStatic
  fun clear() {
    NitroLocalStorageLoader.ensure()
    preferences.edit().clear().apply()
  }
}
