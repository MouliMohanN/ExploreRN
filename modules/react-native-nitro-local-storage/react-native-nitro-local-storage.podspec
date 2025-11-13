Pod::Spec.new do |s|
  s.name         = "react-native-nitro-local-storage"
  s.version      = "0.1.0"
  s.summary      = "Nitro HybridObject wrapper around platform local storage"
  s.description  = <<-DESC
    Provides a Nitro HybridObject that mirrors the LocalStorage TurboModule API,
    enabling synchronous access from any Nitro-compatible runtime.
  DESC
  s.homepage     = "https://github.com/yourusername/react-native-nitro-local-storage"
  s.license      = { :type => "MIT" }
  s.author       = { "Your Name" => "you@example.com" }
  s.platform     = :ios, "13.4"

  s.source       = { :path => "." }
  s.source_files = [
    "ios/**/*.{h,m,mm}",
    "cpp/**/*.{hpp,cpp}"
  ]

  s.pod_target_xcconfig = {
    'CLANG_CXX_LANGUAGE_STANDARD' => 'c++20',
    'CLANG_CXX_LIBRARY' => 'libc++'
  }

  s.dependency "React-Core"
  s.dependency "NitroModules"
end
