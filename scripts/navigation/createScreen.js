#!/usr/bin/env node

/**
 * Screen Template Generator
 * 
 * A CLI tool to quickly create new screens following the conventions
 */

const fs = require('fs');
const path = require('path');

class ScreenGenerator {
  constructor() {
    this.args = process.argv.slice(2);
  }

  run() {
    if (this.args.length < 2) {
      this.showUsage();
      process.exit(1);
    }

    const [featureName, screenName] = this.args;
    const options = this.parseOptions();

    try {
      this.createScreen(featureName, screenName, options);
      console.log(`✅ Screen created successfully!`);
      console.log(`📁 Location: src/features/${featureName}/${screenName}Screen.tsx`);
      console.log(`🔄 Run 'npm run screens:generate' to update the registry`);
    } catch (error) {
      console.error('❌ Error creating screen:', error.message);
      process.exit(1);
    }
  }

  parseOptions() {
    const options = {
      headerShown: true,
      title: null,
      override: false,
    };

    for (let i = 2; i < this.args.length; i++) {
      const arg = this.args[i];
      if (arg === '--no-header') {
        options.headerShown = false;
      } else if (arg === '--title' && i + 1 < this.args.length) {
        options.title = this.args[i + 1];
        i++; // Skip next argument
      } else if (arg === '--override') {
        options.override = true;
      }
    }

    return options;
  }

  createScreen(featureName, screenName, options) {
    // Validate inputs
    if (/[^a-zA-Z0-9\/]/.test(featureName)) {
      throw new Error('Feature name can only contain alphanumeric characters and slashes.');
    }

    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(screenName)) {
      throw new Error('Screen name must be alphanumeric and start with a letter');
    }

    // Create feature directory if it doesn't exist
    const featureDir = path.join(process.cwd(), 'src', 'features', featureName);
    if (!fs.existsSync(featureDir)) {
      fs.mkdirSync(featureDir, { recursive: true });
      console.log(`📁 Created feature directory: ${featureName}`);
    }

    // Generate file path
    const fileName = `${screenName}Screen.tsx`;
    const filePath = path.join(featureDir, fileName);

    // Check if file already exists
    if (fs.existsSync(filePath) && !options.override) {
      throw new Error(`Screen file already exists: ${filePath}. Use the --override flag to overwrite it.`);
    }

    // Generate screen content
    const screenContent = this.generateScreenTemplate(featureName, screenName, options);

    // Write file
    fs.writeFileSync(filePath, screenContent);
  }

  generateScreenTemplate(featureName, screenName, options) {
    const componentName = `${screenName}Screen`;
    const title = options.title || `${screenName} Screen`;

    const featureDir = path.join(process.cwd(), 'src', 'features', featureName);
    const commonDir = path.join(process.cwd(), 'src', 'common');
    let relativePathToCommon = path.relative(featureDir, commonDir);
    relativePathToCommon = relativePathToCommon.replace(/\\/g, '/');

    return `import React from 'react';
import { Text, View } from 'react-native';
import { ScreenBaseProps } from '${relativePathToCommon}/types/ScreenBaseProps';
import { ScreenConfig } from '${relativePathToCommon}/navigation/conventions';

export default function ${componentName}({ navigation }: ScreenBaseProps): React.ReactElement {
  return (
    <View>
      <Text>${title}</Text>
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: '${screenName}',
  component: ${componentName},
  options: {
    headerShown: ${options.headerShown},
    title: '${title}',
  },
};
`;
  }

  showUsage() {
    console.log(`
🚀 Screen Generator

Usage: npm run create-screen <feature> <screen> [options]

Arguments:
  feature     Feature name (e.g., 'auth', 'profile', 'auth/resetPassword')
  screen      Screen name (e.g., 'Login', 'Settings')

Options:
  --no-header     Hide the navigation header
  --title <text>  Custom screen title
  --override      Override the existing screen file

Examples:
  npm run create-screen auth Login
  npm run create-screen profile Settings --title "User Settings"
  npm run create-screen onboarding Welcome --no-header

The screen will be created at:
  src/features/<feature>/<screen>Screen.tsx

After creation:
  1. The screen is automatically discovered by the build system
  2. Run 'npm run screens:generate' to update the registry
  3. Use 'ScreenNames.<screen>' to navigate to it
`);
  }
}

// Run the generator
if (require.main === module) {
  const generator = new ScreenGenerator();
  generator.run();
}

module.exports = ScreenGenerator;
