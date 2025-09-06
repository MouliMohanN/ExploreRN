package com.explorern.nativeModules

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = NetworkBrotliModule.NAME)
class NetworkBrotliModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        const val NAME: String = "NetworkBrotli"
    }

    private var enabled: Boolean = false

    override fun getName(): String = NAME

    @ReactMethod
    fun isEnabled(promise: Promise) {
        promise.resolve(enabled)
    }

    @ReactMethod
    fun setEnabled(enabled: Boolean, promise: Promise) {
        this.enabled = enabled
        promise.resolve(enabled)
    }
}
