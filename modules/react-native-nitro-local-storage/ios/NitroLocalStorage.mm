#import <Foundation/Foundation.h>

#import "NitroLocalStorageHybrid.hpp"

using namespace nitrolocalstorage;

namespace {
static NSString *const kSuiteName = @"LocalStorage";

NSUserDefaults *GetDefaults() {
  static NSUserDefaults *defaults = [[NSUserDefaults alloc] initWithSuiteName:kSuiteName];
  return defaults;
}

NSString *MakeNSString(const std::string &value) {
  return [[NSString alloc] initWithUTF8String:value.c_str()];
}

std::string MakeStdString(NSString *value) {
  return std::string([value UTF8String]);
}
}

namespace nitrolocalstorage {

void platformSetItem(const std::string &value, const std::string &key) {
  @autoreleasepool {
    NSUserDefaults *defaults = GetDefaults();
    NSString *nsValue = MakeNSString(value);
    NSString *nsKey = MakeNSString(key);
    [defaults setObject:nsValue forKey:nsKey];
  }
}

std::optional<std::string> platformGetItem(const std::string &key) {
  @autoreleasepool {
    NSUserDefaults *defaults = GetDefaults();
    NSString *nsKey = MakeNSString(key);
    NSString *storedValue = [defaults stringForKey:nsKey];

    if (storedValue == nil) {
      return std::nullopt;
    }

    return MakeStdString(storedValue);
  }
}

void platformRemoveItem(const std::string &key) {
  @autoreleasepool {
    NSUserDefaults *defaults = GetDefaults();
    NSString *nsKey = MakeNSString(key);
    [defaults removeObjectForKey:nsKey];
  }
}

void platformClear() {
  @autoreleasepool {
    NSUserDefaults *defaults = GetDefaults();
    NSDictionary<NSString *, id> *dictionary = [defaults dictionaryRepresentation];
    for (NSString *key in dictionary) {
      [defaults removeObjectForKey:key];
    }
  }
}

} // namespace nitrolocalstorage

__attribute__((constructor))
static void RegisterNitroLocalStorage() {
  registerNitroLocalStorage();
}
