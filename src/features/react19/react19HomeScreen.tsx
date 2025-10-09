import React, { Suspense, createContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

// Import individual example components
import ConcurrentFeaturesExample from './examples/ConcurrentFeaturesExample';
import ReactCompilerExample from './examples/ReactCompilerExample';
import RefImprovementsExample from './examples/RefImprovementsExample';
import UseActionStateExample from './examples/UseActionStateExample';
import UseFormStatusExample from './examples/UseFormStatusExample';
import UseHookExample from './examples/UseHookExample';
import UseOptimisticExample from './examples/UseOptimisticExample';

// Feature list with descriptions
const REACT_19_FEATURES = [
  {
    id: 'useActionState',
    title: 'useActionState Hook',
    description: 'Manage async actions with built-in pending states and error handling',
    color: '#007AFF',
    component: UseActionStateExample,
  },
  {
    id: 'useOptimistic',
    title: 'useOptimistic Hook',
    description: 'Optimistic UI updates with automatic rollback on failure',
    color: '#FF6B6B',
    component: UseOptimisticExample,
  },
  {
    id: 'useFormStatus',
    title: 'useFormStatus Hook',
    description: 'Track form submission status within form context',
    color: '#4ECDC4',
    component: UseFormStatusExample,
  },
  {
    id: 'useHook',
    title: 'use() Hook',
    description: 'Consume promises and context with flexible syntax',
    color: '#45B7D1',
    component: UseHookExample,
  },
  {
    id: 'refImprovements',
    title: 'Ref Improvements',
    description: 'Ref as prop, cleanup functions, and better patterns',
    color: '#96CEB4',
    component: RefImprovementsExample,
  },
  {
    id: 'concurrentFeatures',
    title: 'Concurrent Features',
    description: 'Enhanced Suspense, transitions, and deferred values',
    color: '#FECA57',
    component: ConcurrentFeaturesExample,
  },
  {
    id: 'reactCompiler',
    title: 'React Compiler',
    description: 'Automatic memoization and compile-time optimizations',
    color: '#9B59B6',
    component: ReactCompilerExample,
  },
];

// Context for theme (to demonstrate use() hook later)
export const ThemeContext = createContext({
  primary: '#007AFF',
  background: '#FFFFFF',
  text: '#000000',
});

interface FeatureCardProps {
  feature: (typeof REACT_19_FEATURES)[0];
  onPress: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onPress }) => (
  <TouchableOpacity
    style={[styles.featureCard, { borderLeftColor: feature.color }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.featureContent}>
      <Text style={[styles.featureTitle, { color: feature.color }]}>{feature.title}</Text>
      <Text style={styles.featureDescription}>{feature.description}</Text>
      <View style={styles.featureFooter}>
        <Text style={[styles.exploreText, { color: feature.color }]}>Tap to explore →</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function react19HomeScreen({ navigation }: ScreenBaseProps): React.ReactElement {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeature(featureId);
  };

  const handleBackToHome = () => {
    setSelectedFeature(null);
  };

  const renderFeatureExample = () => {
    const feature = REACT_19_FEATURES.find((f) => f.id === selectedFeature);
    if (!feature) return null;

    const ExampleComponent = feature.component;

    return (
      <View style={styles.exampleContainer}>
        <View style={styles.exampleHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.exampleTitle}>{feature.title}</Text>
        </View>

        <Suspense
          fallback={
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading example...</Text>
            </View>
          }
        >
          <ExampleComponent />
        </Suspense>
      </View>
    );
  };

  if (selectedFeature) {
    return <SafeAreaView style={styles.container}>{renderFeatureExample()}</SafeAreaView>;
  }

  return (
    <ThemeContext.Provider
      value={{
        primary: '#007AFF',
        background: '#FFFFFF',
        text: '#000000',
      }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.mainTitle}>React 19 Features</Text>
            <Text style={styles.subtitle}>Interactive examples for React Native</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>React 19 + RN 0.76+</Text>
            </View>
          </View>

          {/* Feature Overview */}
          <View style={styles.overviewSection}>
            <Text style={styles.sectionTitle}>🚀 What's New</Text>
            <Text style={styles.overviewText}>
              React 19 brings powerful new hooks, automatic optimizations, and enhanced developer experience to React
              Native apps. Explore each feature with interactive examples below.
            </Text>
          </View>

          {/* Key Highlights */}
          <View style={styles.highlightsSection}>
            <Text style={styles.sectionTitle}>✨ Key Highlights</Text>
            <View style={styles.highlightsList}>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightBullet}>•</Text>
                <Text style={styles.highlightText}>
                  <Text style={styles.highlightBold}>React Compiler:</Text> Automatic memoization and optimizations
                </Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightBullet}>•</Text>
                <Text style={styles.highlightText}>
                  <Text style={styles.highlightBold}>New Hooks:</Text> useActionState, useOptimistic, use(), and more
                </Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightBullet}>•</Text>
                <Text style={styles.highlightText}>
                  <Text style={styles.highlightBold}>Better UX:</Text> Optimistic updates and enhanced error handling
                </Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightBullet}>•</Text>
                <Text style={styles.highlightText}>
                  <Text style={styles.highlightBold}>Performance:</Text> Improved concurrent rendering and Suspense
                </Text>
              </View>
            </View>
          </View>

          {/* Interactive Examples */}
          <View style={styles.examplesSection}>
            <Text style={styles.sectionTitle}>📱 Interactive Examples</Text>
            <Text style={styles.examplesSubtitle}>Tap any card below to see the feature in action</Text>

            <View style={styles.featuresGrid}>
              {REACT_19_FEATURES.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} onPress={() => handleFeatureSelect(feature.id)} />
              ))}
            </View>
          </View>

          {/* Quick Setup */}
          <View style={styles.setupSection}>
            <Text style={styles.sectionTitle}>⚡ Quick Setup</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                # Install React 19{'\n'}
                npm install react@19 react-dom@19{'\n'}
                {'\n'}# Upgrade React Native{'\n'}
                npx react-native upgrade{'\n'}
                {'\n'}# Optional: React Compiler{'\n'}
                npm install babel-plugin-react-compiler
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>🎯 Ready to explore? Tap on any feature above to see it in action!</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 8,
  },
  badge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976d2',
  },
  overviewSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  overviewText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#495057',
  },
  highlightsSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  highlightsList: {
    marginTop: 8,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  highlightBullet: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 8,
    marginTop: 2,
  },
  highlightText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    color: '#495057',
  },
  highlightBold: {
    fontWeight: '600',
    color: '#2c3e50',
  },
  examplesSection: {
    padding: 20,
  },
  examplesSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    gap: 12,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 12,
  },
  featureFooter: {
    alignItems: 'flex-end',
  },
  exploreText: {
    fontSize: 13,
    fontWeight: '600',
  },
  setupSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  codeBlock: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginTop: 8,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 13,
    color: '#495057',
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Example container styles
  exampleContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  exampleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
  },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'react19Home',
  component: react19HomeScreen,
  options: {
    headerShown: true,
    title: 'React 19 Features',
  },
};
