package com.reactnativelocalstorage

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext

class NativeLocalStorageModule(reactContext: ReactApplicationContext) :
    NativeLocalStorageSpec(reactContext) {

    private val sharedPreferences: SharedPreferences = reactContext.getSharedPreferences(
        SHARED_PREFERENCES_NAME,
        Context.MODE_PRIVATE
    )

    override fun getName(): String = NAME

    override fun setItem(value: String, key: String) {
        sharedPreferences.edit().apply {
            putString(key, value)
            apply()
        }
    }

    override fun getItem(key: String): String? {
        return sharedPreferences.getString(key, null)
    }

    override fun removeItem(key: String) {
        sharedPreferences.edit().apply {
            remove(key)
            apply()
        }
    }

    override fun clear() {
        sharedPreferences.edit().apply {
            clear()
            apply()
        }
    }

    companion object {
        const val NAME = "NativeLocalStorage"
        private const val SHARED_PREFERENCES_NAME = "LocalStorage"
    }
}
