#include "NitroLocalStorageHybrid.hpp"

#include <NitroModules/HybridObjectRegistry.hpp>
#include <memory>

namespace nitrolocalstorage {

using margelo::nitro::HybridObject;
using margelo::nitro::HybridObjectRegistry;
using margelo::nitro::Prototype;

NitroLocalStorageHybrid::NitroLocalStorageHybrid() : HybridObject(TAG) {}

void NitroLocalStorageHybrid::loadHybridMethods() {
  HybridObject::loadHybridMethods();

  registerHybrids(this, [](Prototype& prototype) {
    prototype.registerHybridMethod("setItem", &NitroLocalStorageHybrid::setItem);
    prototype.registerHybridMethod("getItem", &NitroLocalStorageHybrid::getItem);
    prototype.registerHybridMethod("removeItem", &NitroLocalStorageHybrid::removeItem);
    prototype.registerHybridMethod("clear", &NitroLocalStorageHybrid::clear);
  });
}

void NitroLocalStorageHybrid::setItem(const std::string& value, const std::string& key) {
  platformSetItem(value, key);
}

std::optional<std::string> NitroLocalStorageHybrid::getItem(const std::string& key) {
  return platformGetItem(key);
}

void NitroLocalStorageHybrid::removeItem(const std::string& key) {
  platformRemoveItem(key);
}

void NitroLocalStorageHybrid::clear() {
  platformClear();
}

void registerNitroLocalStorage() {
  HybridObjectRegistry::registerHybridObjectConstructor(
  "NitroLocalStorage",
  []() { return std::make_shared<NitroLocalStorageHybrid>(); });
}

} // namespace nitrolocalstorage
