import React, { useCallback, useRef, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ScreenConfig } from '../../common/navigation/conventions';

/**
 * ===================================
 * MODERN TYPESCRIPT FEATURES DEMO
 * ===================================
 *
 * This component demonstrates TypeScript features from version 4.0 to 5.5
 * Each feature is explained with:
 * 1. Detailed comments explaining the concept
 * 2. UI demonstrations where possible
 * 3. Console logging for outputs
 * 4. Real-world React Native use cases
 */

// ===================================
// TYPESCRIPT 4.0 FEATURES (2020)
// ===================================

/**
 * 1. VARIADIC TUPLE TYPES
 * Allows creating functions that work with tuples of varying lengths
 * Perfect for React Native component prop spreading
 */

// Example: Type-safe component prop merging
type SpreadProps<T extends readonly unknown[]> = T extends readonly [infer H, ...infer R] ? H & SpreadProps<R> : {};

function mergeStyles<T extends readonly object[]>(...styles: T): SpreadProps<T> {
  console.log('🎨 [Variadic Tuple] Merging styles:', styles);
  return Object.assign({}, ...styles) as SpreadProps<T>;
}

type NavigationState = [screenName: string, params: object, timestamp: number];

// Practical React Navigation example
function navigateToScreen([screenName, params, timestamp]: NavigationState) {
  console.log(`🧭 [Labeled Tuple] Navigate to: ${screenName} at ${timestamp}`, params);
}

/**
 * 3. TEMPLATE LITERAL TYPES (Basic)
 * Create types from string templates - great for React Native route names
 */

// Create type-safe route names
type ScreenPrefix = 'Home' | 'Profile' | 'Settings';
type ScreenSuffix = 'Screen' | 'Modal' | 'Tab';
type ScreenNames = `${ScreenPrefix}${ScreenSuffix}`;

// Usage: This ensures only valid screen names are used
function getScreenRoute(name: ScreenNames): string {
  console.log(`📱 [Template Literal] Screen route: ${name}`);
  return name;
}

// ===================================
// TYPESCRIPT 4.1 FEATURES (2020)
// ===================================

/**
 * 4. ADVANCED TEMPLATE LITERAL TYPES
 * More powerful string manipulation at type level
 */

// API endpoint type generation
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiVersion = 'v1' | 'v2';
type Resource = 'users' | 'posts' | 'comments';

// Generate all possible API endpoints
type ApiEndpoint = `/${ApiVersion}/${Resource}`;
type ApiRoute = `${HttpMethod} ${ApiEndpoint}`;

// Type-safe API client
class ApiClient {
  private baseUrl = 'https://api.example.com';

  async request(route: ApiRoute, body?: any): Promise<any> {
    const [method, endpoint] = route.split(' ') as [HttpMethod, ApiEndpoint];
    console.log(`🌐 [Template Literal API] ${method} ${this.baseUrl}${endpoint}`, body);

    // Simulate API call
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, method, endpoint }), 1000));
  }
}

/**
 * 5. KEY REMAPPING IN MAPPED TYPES
 * Transform object keys while preserving type safety
 */

// Convert object keys to getter methods
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// Example: User model with auto-generated getters
interface User {
  id: number;
  name: string;
  email: string;
}

// This creates: { getId(): number; getName(): string; getEmail(): string; }
type UserGetters = Getters<User>;

// Practical implementation
function createUserWithGetters(user: User): User & UserGetters {
  const getters = {} as UserGetters;

  Object.keys(user).forEach((key) => {
    const getterName = `get${key.charAt(0).toUpperCase()}${key.slice(1)}` as keyof UserGetters;
    (getters as any)[getterName] = () => {
      console.log(`🔍 [Key Remapping] Getting ${key}:`, (user as any)[key]);
      return (user as any)[key];
    };
  });

  return { ...user, ...getters };
}

// ===================================
// TYPESCRIPT 4.9 FEATURES (2022)
// ===================================

/**
 * 6. SATISFIES OPERATOR
 * Type checking without widening - maintains specific types while ensuring constraints
 * Perfect for React Native styling and configuration objects
 */

// Define what a theme should have, but keep specific values
type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
};

// Without satisfies: colors would be typed as ThemeColors (loses specific string values)
// With satisfies: colors keeps literal types but ensures it matches ThemeColors structure
const appTheme = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ecf0f1',
  // accent: '#e74c3c' // This would cause error - not in ThemeColors
} satisfies ThemeColors;

// Now we can access specific color values AND ensure type safety
function useThemeColor(color: keyof typeof appTheme) {
  console.log(`🎨 [Satisfies] Using color ${color}:`, appTheme[color]);
  return appTheme[color]; // Return type is specific string literal, not just 'string'
}

// Shared design tokens - use variables instead of hardcoded values in styles
const COLORS = {
  background: '#f8f9fa',
  surface: '#ffffff',
  textPrimary: '#2c3e50',
  textSecondary: '#7f8c8d',
  primary: '#3498db',
  success: '#4CAF50',
  danger: '#F44336',
  info: '#2196F3',
  muted: '#757575',
  lightGray: '#ecf0f1',
  secondaryGray: '#95a5a6',
  border: '#bdc3c7',
  green: '#27ae60',
};

const SIZES = {
  padding: 16,
  smallPadding: 8,
  largePadding: 20,
  title: 24,
  subtitle: 14,
  categoryTitle: 18,
  buttonText: 12,
  primaryButtonText: 16,
  logsTitle: 18,
};

const RADIUS = {
  card: 12,
  button: 8,
  small: 4,
};

const SHADOW = {
  color: '#000',
  offset: { width: 0, height: 2 },
  opacity: 0.1,
  radius: 4,
  elevation: 3,
};

/**
 * 7. UNLISTED PROPERTY NARROWING WITH 'IN' OPERATOR
 * Better type narrowing for object property checks
 */

interface NetworkError {
  type: 'network';
  code: number;
}

interface ValidationError {
  type: 'validation';
  field: string;
}

type AppError = NetworkError | ValidationError;

function handleError(error: AppError) {
  console.log('🚨 [In Operator] Handling error:', error);

  if ('code' in error) {
    // TypeScript now knows this is NetworkError
    console.log(`Network error with code: ${error.code}`);
    return `Network Error ${error.code}`;
  } else {
    // TypeScript knows this is ValidationError
    console.log(`Validation error in field: ${error.field}`);
    return `Validation Error: ${error.field}`;
  }
}

// ===================================
// TYPESCRIPT 5.0 FEATURES (2023)
// ===================================

/**
 * 8. CONST TYPE PARAMETERS
 * Preserve literal types in generic functions
 */

// Without const: T would be string[], loses specific array structure
// With const: T preserves exact tuple structure
function processArray<const T extends readonly string[]>(arr: T): T {
  console.log('📊 [Const Type Params] Processing array:', arr);
  // Return type is exactly what was passed in, not just string[]
  return arr;
}

// Usage maintains exact types
// fruits is typed as readonly ["apple", "banana", "orange"], not string[]

// Example class (decorators might not work in RN, but shows concept)

// ===================================
// TYPESCRIPT 5.4 FEATURES (2024)
// ===================================

// Practical example: React-like state management
// function useState<T>(initialValue: T) {
//   let state = initialValue;

//   const setState = (newValue: T | ((prev: T) => NoInfer<T>)) => {
//     if (typeof newValue === 'function') {
//       state = (newValue as Function)(state);
//     } else {
//       state = newValue;
//     }
//     console.log('🔄 [NoInfer] State updated to:', state);
//   };

//   return [state, setState] as const;
// }

/**
 * 11. INFERRED TYPE PREDICATES (5.5)
 * Automatic type narrowing in filter operations
 */

// TypeScript 5.5 automatically infers this as a type predicate
function isString(value: unknown) {
  return typeof value === 'string';
}

function filterStrings(items: unknown[]) {
  console.log('🔍 [Inferred Predicates] Filtering strings from:', items);

  // TypeScript automatically knows result is string[]
  const strings = items.filter(isString); // No manual type predicate needed!

  console.log('🔍 [Inferred Predicates] Filtered strings:', strings);
  return strings;
}

// ===================================
// MAIN COMPONENT IMPLEMENTATION
// ===================================

interface LogEntry {
  id: string;
  feature: string;
  message: string;
  timestamp: string;
  type: 'demo' | 'result' | 'error';
}

export default function ModernTypeScriptFeaturesScreen(): React.ReactElement {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [userInput, setUserInput] = useState('');
  const logCounter = useRef(0);

  // Helper to add logs with proper typing
  const addLog = useCallback((feature: string, message: string, type: LogEntry['type'] = 'demo') => {
    const newLog: LogEntry = {
      id: `log_${++logCounter.current}`,
      feature,
      message,
      timestamp: new Date().toLocaleTimeString(),
      type,
    };

    setLogs((prev) => [...prev, newLog]);
    console.log(`[${newLog.timestamp}] ${feature}: ${message}`);
  }, []);

  // Demo functions for each TypeScript feature
  const demoVariadicTuples = () => {
    addLog('Variadic Tuples', 'Starting variadic tuple demonstration');

    const style1 = { backgroundColor: 'blue' };
    const style2 = { padding: 10 };
    const style3 = { margin: 5 };

    const merged = mergeStyles(style1, style2, style3);
    addLog('Variadic Tuples', `Merged styles: ${JSON.stringify(merged)}`, 'result');
  };

  const demoLabeledTuples = () => {
    addLog('Labeled Tuples', 'Starting labeled tuple demonstration');

    const navState: NavigationState = ['ProfileScreen', { userId: 123 }, Date.now()];
    navigateToScreen(navState);
    addLog('Labeled Tuples', 'Navigation state processed successfully', 'result');
  };

  const demoTemplateLiterals = () => {
    addLog('Template Literals', 'Starting template literal types demonstration');

    const screenNames: ScreenNames[] = ['HomeScreen', 'ProfileModal', 'SettingsTab'];
    screenNames.forEach((name) => getScreenRoute(name));
    addLog('Template Literals', `Processed ${screenNames.length} screen names`, 'result');
  };

  const demoApiClient = async () => {
    addLog('API Client', 'Starting API client demonstration');

    const client = new ApiClient();
    try {
      const result = await client.request('GET /v1/users');
      addLog('API Client', `API call result: ${JSON.stringify(result)}`, 'result');
    } catch (error) {
      addLog('API Client', `API call failed: ${error}`, 'error');
    }
  };

  const demoKeyRemapping = () => {
    addLog('Key Remapping', 'Starting key remapping demonstration');

    const user: User = { id: 1, name: 'John Doe', email: 'john@example.com' };
    const userWithGetters = createUserWithGetters(user);

    // Demonstrate the generated getters
    const id = userWithGetters.getId();
    const name = userWithGetters.getName();
    const email = userWithGetters.getEmail();

    addLog('Key Remapping', `User getters - ID: ${id}, Name: ${name}, Email: ${email}`, 'result');
  };

  const demoSatisfiesOperator = () => {
    addLog('Satisfies Operator', 'Starting satisfies operator demonstration');

    const colors = ['primary', 'secondary', 'background'] as const;
    colors.forEach((color) => useThemeColor(color));
    addLog('Satisfies Operator', 'Theme colors accessed with type safety', 'result');
  };

  const demoInOperator = () => {
    addLog('In Operator', 'Starting in operator narrowing demonstration');

    const networkError: NetworkError = { type: 'network', code: 404 };
    const validationError: ValidationError = { type: 'validation', field: 'email' };

    const networkResult = handleError(networkError);
    const validationResult = handleError(validationError);

    addLog('In Operator', `Network: ${networkResult}, Validation: ${validationResult}`, 'result');
  };

  const demoConstTypeParams = () => {
    addLog('Const Type Params', 'Starting const type parameters demonstration');

    const result = processArray(['apple', 'banana', 'orange'] as const);
    addLog('Const Type Params', `Processed array maintains exact types: ${result.join(', ')}`, 'result');
  };

  const demoNoInfer = () => {
    addLog('NoInfer', 'Starting NoInfer utility type demonstration');

    const [, setCount] = useState(0);
    setCount((prev) => prev + 1);
    setCount(42);

    addLog('NoInfer', 'State management with NoInfer type completed', 'result');
  };

  const demoInferredPredicates = () => {
    addLog('Inferred Predicates', 'Starting inferred type predicates demonstration');

    const mixedItems = [1, 'hello', true, 'world', null, 'typescript'];
    const strings = filterStrings(mixedItems);

    addLog('Inferred Predicates', `Filtered ${strings.length} strings from mixed array`, 'result');
  };

  const clearLogs = () => {
    setLogs([]);
    logCounter.current = 0;
    addLog('System', 'Logs cleared');
  };

  const runAllDemos = async () => {
    addLog('System', '🚀 Running all TypeScript feature demonstrations');

    demoVariadicTuples();
    await new Promise((resolve) => setTimeout(resolve, 200));

    demoLabeledTuples();
    await new Promise((resolve) => setTimeout(resolve, 200));

    demoTemplateLiterals();
    await new Promise((resolve) => setTimeout(resolve, 200));

    await demoApiClient();
    await new Promise((resolve) => setTimeout(resolve, 200));

    demoKeyRemapping();
    await new Promise((resolve) => setTimeout(resolve, 200));

    demoSatisfiesOperator();
    await new Promise((resolve) => setTimeout(resolve, 200));

    demoInOperator();
    await new Promise((resolve) => setTimeout(resolve, 200));

    demoConstTypeParams();
    await new Promise((resolve) => setTimeout(resolve, 200));

    demoNoInfer();
    await new Promise((resolve) => setTimeout(resolve, 200));

    demoInferredPredicates();

    addLog('System', '✅ All demonstrations completed!', 'result');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={true}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Modern TypeScript Features</Text>
          <Text style={styles.subtitle}>TypeScript 4.0 - 5.5 • Interactive Demonstrations</Text>
        </View>

        {/* Feature Categories */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>🎯 TypeScript 4.0-4.3 Features</Text>
          <View style={styles.buttonGrid}>
            <TouchableOpacity style={styles.featureButton} onPress={demoVariadicTuples}>
              <Text style={styles.buttonText}>📊 Variadic Tuples</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton} onPress={demoLabeledTuples}>
              <Text style={styles.buttonText}>🏷️ Labeled Tuples</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton} onPress={demoTemplateLiterals}>
              <Text style={styles.buttonText}>📝 Template Literals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton} onPress={demoKeyRemapping}>
              <Text style={styles.buttonText}>🔑 Key Remapping</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>🚀 TypeScript 4.4-4.9 Features</Text>
          <View style={styles.buttonGrid}>
            <TouchableOpacity style={styles.featureButton} onPress={demoSatisfiesOperator}>
              <Text style={styles.buttonText}>✅ Satisfies Operator</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton} onPress={demoInOperator}>
              <Text style={styles.buttonText}>🔍 In Operator</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>⚡ TypeScript 5.0+ Features</Text>
          <View style={styles.buttonGrid}>
            <TouchableOpacity style={styles.featureButton} onPress={demoConstTypeParams}>
              <Text style={styles.buttonText}>📌 Const Type Params</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton} onPress={demoNoInfer}>
              <Text style={styles.buttonText}>🚫 NoInfer Type</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton} onPress={demoInferredPredicates}>
              <Text style={styles.buttonText}>🤖 Inferred Predicates</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>🌐 Advanced Examples</Text>
          <View style={styles.buttonGrid}>
            <TouchableOpacity style={styles.featureButton} onPress={demoApiClient}>
              <Text style={styles.buttonText}>🔗 Type-Safe API</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={runAllDemos}>
            <Text style={styles.primaryButtonText}>🚀 Run All Demos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={clearLogs}>
            <Text style={styles.secondaryButtonText}>🗑️ Clear Logs</Text>
          </TouchableOpacity>
        </View>

        {/* Interactive Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Test Input (for type inference demos):</Text>
          <TextInput
            style={styles.textInput}
            value={userInput}
            onChangeText={setUserInput}
            placeholder='Enter text to see type inference...'
            placeholderTextColor='#999'
          />
        </View>

        {/* Logs Display */}
        <View style={styles.logsContainer}>
          <Text style={styles.logsTitle}>📋 Execution Logs ({logs.length})</Text>
          {logs.length === 0 ?
            <Text style={styles.emptyLogs}>
              No logs yet. Click any feature button to see demonstrations with detailed explanations!
            </Text>
          : logs.map((log) => (
              <View key={log.id} style={[styles.logEntry, { borderLeftColor: getLogColor(log.type) }]}>
                <View style={styles.logHeader}>
                  <Text style={[styles.logFeature, { color: getLogColor(log.type) }]}>[{log.feature}]</Text>
                  <Text style={styles.logTimestamp}>{log.timestamp}</Text>
                </View>
                <Text style={styles.logMessage}>{log.message}</Text>
              </View>
            ))
          }
        </View>

        {/* Footer with TypeScript Version Info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 These features improve type safety, developer experience, and code maintainability in React Native
            projects
          </Text>
          <Text style={styles.versionText}>Features from TypeScript 4.0 (2020) to 5.5 (2024)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function for log colors
function getLogColor(type: LogEntry['type']): string {
  switch (type) {
    case 'result':
      return COLORS.success;
    case 'error':
      return COLORS.danger;
    case 'demo':
      return COLORS.info;
    default:
      return COLORS.muted;
  }
}

type Styles = {
  container: ViewStyle;
  scrollContainer: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  categoryContainer: ViewStyle;
  categoryTitle: TextStyle;
  buttonGrid: ViewStyle;
  featureButton: ViewStyle;
  buttonText: TextStyle;
  controlsContainer: ViewStyle;
  primaryButton: ViewStyle;
  primaryButtonText: TextStyle;
  secondaryButton: ViewStyle;
  secondaryButtonText: TextStyle;
  inputContainer: ViewStyle;
  inputLabel: TextStyle;
  textInput: TextStyle;
  logsContainer: ViewStyle;
  logsTitle: TextStyle;
  emptyLogs: TextStyle;
  logEntry: ViewStyle;
  logHeader: ViewStyle;
  logFeature: TextStyle;
  logTimestamp: TextStyle;
  logMessage: TextStyle;
  footer: ViewStyle;
  footerText: TextStyle;
  versionText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SIZES.largePadding,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    marginBottom: SIZES.padding,
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: SIZES.subtitle,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 20,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    padding: SIZES.padding,
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  categoryTitle: {
    fontSize: SIZES.categoryTitle,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: SIZES.smallPadding,
    borderRadius: RADIUS.button,
    marginBottom: SIZES.smallPadding,
    minWidth: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.surface,
    fontSize: SIZES.buttonText,
    fontWeight: '600',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: COLORS.green,
    flex: 1,
    marginRight: 8,
    paddingVertical: 14,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.surface,
    fontSize: SIZES.primaryButtonText,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: COLORS.secondaryGray,
    flex: 1,
    marginLeft: 8,
    paddingVertical: 14,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.surface,
    fontSize: SIZES.primaryButtonText,
    fontWeight: '600',
  },
  inputContainer: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: RADIUS.card,
    marginBottom: SIZES.padding,
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  inputLabel: {
    fontSize: SIZES.subtitle,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.smallPadding,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.button,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: SIZES.primaryButtonText,
    color: COLORS.textPrimary,
  },
  logsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  logsTitle: {
    fontSize: SIZES.logsTitle,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  emptyLogs: {
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
    lineHeight: 20,
  },
  logEntry: {
    borderLeftWidth: 4,
    paddingLeft: 12,
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.small,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  logFeature: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  logTimestamp: {
    fontSize: 11,
    color: COLORS.secondaryGray,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  logMessage: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  footer: {
    backgroundColor: COLORS.lightGray,
    padding: SIZES.padding,
    borderRadius: RADIUS.card,
    marginBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.secondaryGray,
    fontStyle: 'italic',
  },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'ModernTypeScriptFeatures',
  component: ModernTypeScriptFeaturesScreen,
  options: {
    headerShown: true,
    title: 'Modern TypeScript Features',
    headerStyle: {
      backgroundColor: '#3498db',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
};
