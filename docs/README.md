# React 19 Features for React Native - Complete Guide

Welcome to the comprehensive guide for React 19 features in React Native development. This documentation covers all new features, APIs, and improvements introduced in React 19.

## 📚 Documentation Structure

### Core Features
- [**New Hooks**](./hooks.md) - Complete guide to all new hooks
- [**React Compiler**](./compiler.md) - Automatic optimization and performance
- [**Server Components**](./server-components.md) - Server-side rendering improvements
- [**Actions & Forms**](./actions-forms.md) - Enhanced form handling and actions

### API Improvements
- [**Ref Improvements**](./ref-improvements.md) - New ref patterns and cleanup
- [**Concurrent Features**](./concurrent-features.md) - Suspense and concurrent rendering
- [**Error Boundaries**](./error-boundaries.md) - Enhanced error handling

### Migration & Setup
- [**Migration Guide**](./migration-guide.md) - Upgrading from React 18
- [**Setup Guide**](./setup.md) - Configuring React 19 in React Native

### Practical Examples
- [**Examples**](./examples/) - Working code samples for all features

## 🚀 What's New in React 19

### Major Features
1. **React Compiler** - Automatic memoization and optimization
2. **New Hooks** - `useActionState`, `useFormStatus`, `useOptimistic`, `use()`
3. **Server Components** - Enhanced server-side rendering
4. **Actions** - Built-in form and async action handling
5. **Ref as Prop** - Pass refs directly as props
6. **Enhanced Suspense** - Better error handling and concurrent features

### Performance Improvements
- Automatic memoization without manual optimization
- Better tree-shaking and dead code elimination
- Improved concurrent rendering
- Enhanced hydration for React Native Web

### Developer Experience
- Simplified state management patterns
- Better TypeScript integration
- Improved debugging tools
- Enhanced error messages

## 🎯 React Native Compatibility

### Supported Versions
- **React Native 0.76+** - Full React 19 support
- **React Native 0.74-0.75** - Partial support with polyfills
- **Metro Bundler** - Version 0.80+ recommended for React Compiler

### Platform Support
- ✅ **iOS** - Full support
- ✅ **Android** - Full support  
- ✅ **Web** - Full support with enhanced SSR
- ✅ **Windows** - Full support
- ✅ **macOS** - Full support

## 🛠 Quick Start

```bash
# Install React 19 in your React Native project
npm install react@19 react-dom@19

# For React Native 0.76+
npx react-native upgrade

# Install React Compiler (optional)
npm install babel-plugin-react-compiler
```

## 📋 Feature Status

| Feature | React Native Status | Documentation |
|---------|-------------------|---------------|
| React Compiler | ✅ Stable | [Guide](./compiler.md) |
| useActionState | ✅ Stable | [Hooks](./hooks.md#useactionstate) |
| useFormStatus | ✅ Stable | [Hooks](./hooks.md#useformstatus) |
| useOptimistic | ✅ Stable | [Hooks](./hooks.md#useoptimistic) |
| use() Hook | ✅ Stable | [Hooks](./hooks.md#use-hook) |
| Server Components | ✅ Stable | [Server Components](./server-components.md) |
| Actions | ✅ Stable | [Actions](./actions-forms.md) |
| Ref as Prop | ✅ Stable | [Ref Guide](./ref-improvements.md) |
| Enhanced Suspense | ✅ Stable | [Concurrent](./concurrent-features.md) |

## 🔄 Breaking Changes

React 19 introduces minimal breaking changes. See the [Migration Guide](./migration-guide.md) for detailed information about:

- Removed deprecated APIs
- Updated TypeScript types
- Changed default behaviors
- Metro bundler configuration updates

## 💡 Getting Help

- Check the [examples directory](./examples/) for working code samples
- Review the migration guide for upgrade assistance
- Each feature document includes troubleshooting sections

---

*This documentation is updated for React 19.0 and React Native 0.76+*
