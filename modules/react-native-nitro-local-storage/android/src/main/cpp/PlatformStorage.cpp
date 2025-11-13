#include "NitroLocalStorageHybrid.hpp"

#include <fbjni/fbjni.h>
#include <jni.h>
#include <stdexcept>

namespace nitrolocalstorage {
namespace {
constexpr const char* CLASS_NAME = "com/reactnativenitrolocalstorage/LocalStorageHelper";

jclass gHelperClass = nullptr;
jmethodID gSetItem = nullptr;
jmethodID gGetItem = nullptr;
jmethodID gRemoveItem = nullptr;
jmethodID gClear = nullptr;

void checkAndClear(JNIEnv* env, const char* methodName) {
  if (!env->ExceptionCheck()) {
    return;
  }

  env->ExceptionDescribe();
  env->ExceptionClear();
  throw std::runtime_error(std::string("LocalStorageHelper.") + methodName + " threw an exception");
}

void ensureHelper(JNIEnv* env) {
  if (gHelperClass != nullptr) {
    return;
  }

  jclass localClass = env->FindClass(CLASS_NAME);
  checkAndClear(env, "classLookup");
  if (localClass == nullptr) {
    throw std::runtime_error("Failed to find LocalStorageHelper class");
  }

  gHelperClass = reinterpret_cast<jclass>(env->NewGlobalRef(localClass));
  env->DeleteLocalRef(localClass);

  gSetItem = env->GetStaticMethodID(gHelperClass, "setItem", "(Ljava/lang/String;Ljava/lang/String;)V");
  checkAndClear(env, "setItem");
  gGetItem = env->GetStaticMethodID(gHelperClass, "getItem", "(Ljava/lang/String;)Ljava/lang/String;");
  checkAndClear(env, "getItem");
  gRemoveItem = env->GetStaticMethodID(gHelperClass, "removeItem", "(Ljava/lang/String;)V");
  checkAndClear(env, "removeItem");
  gClear = env->GetStaticMethodID(gHelperClass, "clear", "()V");
  checkAndClear(env, "clear");
}

inline jstring makeJString(JNIEnv* env, const std::string& value) {
  return env->NewStringUTF(value.c_str());
}

} // namespace

void platformSetItem(const std::string& value, const std::string& key) {
  facebook::jni::ThreadScope::WithClassLoader([&] {
    JNIEnv* env = facebook::jni::Environment::current();
    ensureHelper(env);

    jstring jValue = makeJString(env, value);
    jstring jKey = makeJString(env, key);
    env->CallStaticVoidMethod(gHelperClass, gSetItem, jValue, jKey);
    checkAndClear(env, "setItem");
    env->DeleteLocalRef(jValue);
    env->DeleteLocalRef(jKey);
  });
}

std::optional<std::string> platformGetItem(const std::string& key) {
  std::optional<std::string> result;
  facebook::jni::ThreadScope::WithClassLoader([&] {
    JNIEnv* env = facebook::jni::Environment::current();
    ensureHelper(env);

    jstring jKey = makeJString(env, key);
    auto value = (jstring)env->CallStaticObjectMethod(gHelperClass, gGetItem, jKey);
    checkAndClear(env, "getItem");
    env->DeleteLocalRef(jKey);

    if (value != nullptr) {
      const char* chars = env->GetStringUTFChars(value, nullptr);
      if (chars != nullptr) {
        result = std::string(chars);
        env->ReleaseStringUTFChars(value, chars);
      }
      env->DeleteLocalRef(value);
    }
  });

  return result;
}

void platformRemoveItem(const std::string& key) {
  facebook::jni::ThreadScope::WithClassLoader([&] {
    JNIEnv* env = facebook::jni::Environment::current();
    ensureHelper(env);

    jstring jKey = makeJString(env, key);
    env->CallStaticVoidMethod(gHelperClass, gRemoveItem, jKey);
    checkAndClear(env, "removeItem");
    env->DeleteLocalRef(jKey);
  });
}

void platformClear() {
  facebook::jni::ThreadScope::WithClassLoader([&] {
    JNIEnv* env = facebook::jni::Environment::current();
    ensureHelper(env);
    env->CallStaticVoidMethod(gHelperClass, gClear);
    checkAndClear(env, "clear");
  });
}

} // namespace nitrolocalstorage
