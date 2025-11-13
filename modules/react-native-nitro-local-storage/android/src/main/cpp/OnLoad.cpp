#include "NitroLocalStorageHybrid.hpp"

#include <fbjni/fbjni.h>

using namespace nitrolocalstorage;

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return facebook::jni::initialize(vm, [] {
    registerNitroLocalStorage();
  });
}
