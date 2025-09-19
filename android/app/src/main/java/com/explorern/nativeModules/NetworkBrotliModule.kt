package com.explorern.nativeModules

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.network.OkHttpClientProvider
import com.facebook.react.modules.network.OkHttpClientFactory
import okhttp3.OkHttpClient
import okhttp3.brotli.BrotliInterceptor

@ReactModule(name = NetworkBrotliModule.NAME)
class NetworkBrotliModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        const val NAME: String = "NetworkBrotli"
        private var brotliEnabled: Boolean = true // Default enabled since we set it up in MainApplication
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun isEnabled(promise: Promise) {
        promise.resolve(brotliEnabled)
    }

    @ReactMethod
    fun setEnabled(enabled: Boolean, promise: Promise) {
        brotliEnabled = enabled
        
        // Reconfigure OkHttpClient based on enabled state
        OkHttpClientProvider.setOkHttpClientFactory(object : OkHttpClientFactory {
            override fun createNewNetworkModuleClient(): OkHttpClient {
                val builder = OkHttpClientProvider.createClientBuilder()
                if (brotliEnabled) {
                    builder.addInterceptor(BrotliInterceptor)
                }
                return builder.build()
            }
        })
        
        promise.resolve(brotliEnabled)
    }
}
