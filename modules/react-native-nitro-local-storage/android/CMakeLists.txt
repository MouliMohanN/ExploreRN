project(NitroLocalStorage)
cmake_minimum_required(VERSION 3.13)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

file(GLOB_RECURSE SHARED_SOURCES CONFIGURE_DEPENDS
     "../cpp/*.cpp")
file(GLOB_RECURSE ANDROID_SOURCES CONFIGURE_DEPENDS
     "src/main/cpp/*.cpp")

add_library(nitro_local_storage SHARED
            ${SHARED_SOURCES}
            ${ANDROID_SOURCES})

get_filename_component(PROJECT_ROOT "${CMAKE_CURRENT_LIST_DIR}/../.." ABSOLUTE)
set(NODE_MODULES_DIR "${PROJECT_ROOT}/node_modules")
set(NITRO_DIR "${NODE_MODULES_DIR}/react-native-nitro-modules")

# Shared headers
target_include_directories(nitro_local_storage
  PUBLIC
    ../cpp
    ${NITRO_DIR}/cpp
    ${NITRO_DIR}/android/src/main/cpp
)

find_library(LOG_LIB log)
find_package(fbjni REQUIRED CONFIG)
find_package(ReactAndroid REQUIRED CONFIG)
find_package(react-native-nitro-modules REQUIRED CONFIG)

set(TARGET_LIBS
  ${LOG_LIB}
  android
  fbjni::fbjni
  ReactAndroid::jsi
  react-native-nitro-modules::NitroModules
)

if(ReactAndroid_VERSION_MINOR GREATER_EQUAL 76)
  list(APPEND TARGET_LIBS ReactAndroid::reactnative)
else()
  list(APPEND TARGET_LIBS ReactAndroid::react_nativemodule_core)
  list(APPEND TARGET_LIBS ReactAndroid::turbomodulejsijni)
endif()

target_link_libraries(nitro_local_storage ${TARGET_LIBS})
