#pragma once

#include <NitroModules/HybridObject.hpp>
#include <optional>
#include <string>

namespace nitrolocalstorage {

class NitroLocalStorageHybrid final : public margelo::nitro::HybridObject {
public:
  NitroLocalStorageHybrid();

  void setItem(const std::string& value, const std::string& key);
  std::optional<std::string> getItem(const std::string& key);
  void removeItem(const std::string& key);
  void clear();

protected:
  void loadHybridMethods() override;

private:
  static constexpr auto TAG = "NitroLocalStorage";
};

void registerNitroLocalStorage();

// Platform-implemented helpers
void platformSetItem(const std::string& value, const std::string& key);
std::optional<std::string> platformGetItem(const std::string& key);
void platformRemoveItem(const std::string& key);
void platformClear();

} // namespace nitrolocalstorage
