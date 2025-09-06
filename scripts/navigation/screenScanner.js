#!/usr/bin/env node

/**
 * Screen Scanner - Build-time screen discovery and registry generation
 *
 * This script scans src/features/ for screen files following our conventions
 * and generates an optimized TypeScript registry with zero runtime overhead.
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

class ScreenScanner {
  constructor(config = {}) {
    this.config = {
      srcDir: path.resolve(process.cwd(), 'src'),
      featuresDir: path.resolve(process.cwd(), 'src/features'),
      outputFile: path.resolve(process.cwd(), 'src/common/navigation/generated/screenRegistry.ts'),
      watchMode: process.argv.includes('--watch'),
      ...config,
    };

    this.screenFiles = new Map();
    this.lastGeneration = 0;
  }

  /**
   * Main entry point
   */
  async run() {
    console.log('🔍 Starting screen discovery...');

    // Ensure output directory exists
    await this.ensureOutputDir();

    // Initial scan
    await this.scanScreens();

    if (this.config.watchMode) {
      this.setupWatcher();
    } else {
      process.exit(0);
    }
  }

  /**
   * Scan all screen files in features directory
   */
  async scanScreens() {
    try {
      const screenFiles = await this.findScreenFiles();
      console.log(`📱 Found ${screenFiles.length} screen files`);

      const screenConfigs = await this.extractScreenConfigs(screenFiles);
      console.log(`⚙️  Extracted ${screenConfigs.length} screen configurations`);

      await this.generateRegistry(screenConfigs);
      console.log('✅ Screen registry generated successfully');
    } catch (error) {
      console.error('❌ Error during screen scanning:', error);
      process.exit(1);
    }
  }

  /**
   * Find all files matching screen conventions
   */
  async findScreenFiles() {
    const screenFiles = [];

    const walkDir = (dir) => {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (this.isScreenFile(file)) {
          screenFiles.push(filePath);
        }
      }
    };

    if (fs.existsSync(this.config.featuresDir)) {
      walkDir(this.config.featuresDir);
    }

    return screenFiles;
  }

  /**
   * Check if file matches screen naming convention
   */
  isScreenFile(filename) {
    return /Screen\.(tsx|ts)$/.test(filename);
  }

  /**
   * Extract screen configurations from files
   */
  async extractScreenConfigs(screenFiles) {
    const configs = [];

    for (const filePath of screenFiles) {
      try {
        const config = await this.extractScreenConfig(filePath);
        if (config) {
          configs.push(config);
        }
      } catch (error) {
        console.warn(`⚠️  Warning: Could not extract config from ${filePath}:`, error.message);
      }
    }

    return configs;
  }

  /**
   * Extract screen config from a single file
   */
  async extractScreenConfig(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract the feature group from path
    const relativePath = path.relative(this.config.featuresDir, filePath);
    const pathParts = relativePath.split(path.sep);
    const featureGroup = pathParts[0];

    // Parse the file to find screenConfig export
    const screenConfig = this.parseScreenConfig(content, filePath);

    if (!screenConfig) {
      return null;
    }

    // Generate relative import path
    const importPath = this.generateImportPath(filePath);

    return {
      ...screenConfig,
      group: screenConfig.group || featureGroup,
      filePath,
      importPath,
      componentName: this.extractComponentName(content) || path.basename(filePath, path.extname(filePath)),
    };
  }

  /**
   * Parse screen config from file content
   */
  parseScreenConfig(content, filePath) {
    // Look for screenConfig export
    const configRegex = /export\s+const\s+screenConfig\s*:\s*ScreenConfig\s*=\s*{([^}]+(?:{[^}]*}[^}]*)*?)}/s;
    const match = content.match(configRegex);

    if (!match) {
      return null;
    }

    try {
      // Extract the config object content
      const configContent = match[1];

      // Parse name
      const nameMatch = configContent.match(/name\s*:\s*['"`]([^'"`]+)['"`]/);
      const name = nameMatch ? nameMatch[1] : null;

      if (!name) {
        throw new Error('Screen config must have a name property');
      }

      // Parse options (optional)
      const optionsMatch = configContent.match(/options\s*:\s*{([^}]+(?:{[^}]*}[^}]*)*?)}/s);
      let options = null;

      if (optionsMatch) {
        // Extract basic options (we'll keep it simple for build-time parsing)
        const optionsContent = optionsMatch[1];
        options = this.parseOptions(optionsContent);
      }

      return {
        name,
        options,
      };
    } catch (error) {
      throw new Error(`Failed to parse screenConfig in ${filePath}: ${error.message}`);
    }
  }

  /**
   * Parse options object (generic version for build-time)
   * This now handles any valid React Navigation option generically
   */
  parseOptions(optionsContent) {
    try {
      // Create a safe evaluation context
      const optionsObject = this.parseObjectLiteral(optionsContent);
      return Object.keys(optionsObject).length > 0 ? optionsObject : null;
    } catch (error) {
      console.warn('Failed to parse options object:', error.message);
      return null;
    }
  }

  /**
   * Parse JavaScript object literal safely
   * Handles nested objects, arrays, booleans, strings, numbers
   */
  parseObjectLiteral(content) {
    const options = {};

    // Remove comments and normalize whitespace
    const cleanContent = content
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*$/gm, '') // Remove line comments
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Parse different types of properties
    this.parseStringProperties(cleanContent, options);
    this.parseBooleanProperties(cleanContent, options);
    this.parseNumberProperties(cleanContent, options);
    this.parseObjectProperties(cleanContent, options);
    this.parseArrayProperties(cleanContent, options);

    return options;
  }

  /**
   * Parse string properties like: title: 'Hello', name: "World"
   */
  parseStringProperties(content, options) {
    const stringPattern = /(\w+)\s*:\s*['"`]([^'"`]*)['"`]/g;
    let match;
    while ((match = stringPattern.exec(content)) !== null) {
      options[match[1]] = match[2];
    }
  }

  /**
   * Parse boolean properties like: headerShown: true, modal: false
   */
  parseBooleanProperties(content, options) {
    const boolPattern = /(\w+)\s*:\s*(true|false)/g;
    let match;
    while ((match = boolPattern.exec(content)) !== null) {
      options[match[1]] = match[2] === 'true';
    }
  }

  /**
   * Parse number properties like: tabBarBadge: 5, fontSize: 16.5
   */
  parseNumberProperties(content, options) {
    const numberPattern = /(\w+)\s*:\s*(-?\d+(?:\.\d+)?)/g;
    let match;
    while ((match = numberPattern.exec(content)) !== null) {
      const value = parseFloat(match[2]);
      options[match[1]] = Number.isInteger(value) ? parseInt(match[2]) : value;
    }
  }

  /**
   * Parse simple object properties like: headerStyle: { backgroundColor: '#fff' }
   */
  parseObjectProperties(content, options) {
    const objectPattern = /(\w+)\s*:\s*\{([^{}]+)\}/g;
    let match;
    while ((match = objectPattern.exec(content)) !== null) {
      const nestedObject = {};
      const objectContent = match[2];

      // Parse the nested object content recursively
      this.parseStringProperties(objectContent, nestedObject);
      this.parseBooleanProperties(objectContent, nestedObject);
      this.parseNumberProperties(objectContent, nestedObject);

      if (Object.keys(nestedObject).length > 0) {
        options[match[1]] = nestedObject;
      }
    }
  }

  /**
   * Parse simple array properties like: tabBarActiveTintColor: ['#fff', '#000']
   */
  parseArrayProperties(content, options) {
    const arrayPattern = /(\w+)\s*:\s*\[([^\[\]]+)\]/g;
    let match;
    while ((match = arrayPattern.exec(content)) !== null) {
      const arrayContent = match[2];
      const items = [];

      // Parse string items
      const stringItems = arrayContent.match(/['"`]([^'"`]*)['"`]/g);
      if (stringItems) {
        stringItems.forEach((item) => {
          items.push(item.replace(/['"`]/g, ''));
        });
      }

      // Parse number items
      const numberItems = arrayContent.match(/-?\d+(?:\.\d+)?/g);
      if (numberItems && !stringItems) {
        numberItems.forEach((item) => {
          const value = parseFloat(item);
          items.push(Number.isInteger(value) ? parseInt(item) : value);
        });
      }

      if (items.length > 0) {
        options[match[1]] = items;
      }
    }
  }

  /**
   * Extract component name from file
   */
  extractComponentName(content) {
    // Look for default export function or const
    const patterns = [/export\s+default\s+(?:function\s+)?(\w+)/, /export\s+(?:default\s+)?(?:const|function)\s+(\w+)/];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * Generate import path relative to the output file
   */
  generateImportPath(filePath) {
    const outputDir = path.dirname(this.config.outputFile);
    const relativePath = path.relative(outputDir, filePath);

    // Convert to forward slashes and remove extension
    return relativePath.replace(/\\/g, '/').replace(/\.(tsx|ts)$/, '');
  }

  /**
   * Generate the optimized TypeScript registry
   */
  async generateRegistry(screenConfigs) {
    const template = this.generateRegistryTemplate(screenConfigs);

    // Ensure output directory exists
    const outputDir = path.dirname(this.config.outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(this.config.outputFile, template);
  }

  /**
   * Generate the TypeScript registry template
   */
  generateRegistryTemplate(screenConfigs) {
    const imports = screenConfigs
      .map(
        (config, index) =>
          `import ${config.componentName}_${index}, { screenConfig as screenConfig_${index} } from '${config.importPath}';`,
      )
      .join('\n');

    const screenArray = screenConfigs
      .map(
        (config, index) => `  {
    name: screenConfig_${index}.name,
    component: ${config.componentName}_${index},
    options: screenConfig_${index}.options || {},
    group: '${config.group}',
  }`,
      )
      .join(',\n');

    const screenNames = screenConfigs.map((config) => `  '${config.name}': '${config.name}'`).join(',\n');

    const { screensByGroupCode, screensByGroupType } = this.generateScreensByGroupCode(screenConfigs);

    return `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * 
 * This file is automatically generated by the screen scanner.
 * To add new screens, create screen files following the conventions
 * and run the screen scanner.
 * 
 * Generated on: ${new Date().toISOString()}
 */

import { ScreenConfig } from '../conventions';

// Screen imports
${imports}

// Pre-computed registry for zero runtime overhead
export const SCREENS: readonly ScreenConfig[] = [
${screenArray}
] as const;

// Pre-computed screen names for zero runtime overhead
export const SCREEN_NAMES = {
${screenNames}
} as const;

// Type definition for screens by group
type ScreensByGroupType = {
${screensByGroupType}
};

// Pre-computed screens by group for zero runtime overhead
export const SCREENS_BY_GROUP: ScreensByGroupType = {
${screensByGroupCode}
} as const;

// Helper functions with zero computation
export const getAllScreens = (): readonly ScreenConfig[] => SCREENS;
export const getScreenNames = () => SCREEN_NAMES;
export const getScreensByGroup = <T extends keyof ScreensByGroupType>(group: T): ScreensByGroupType[T] => SCREENS_BY_GROUP[group] || [] as any;
export const getScreenConfig = (name: string): ScreenConfig | undefined => 
  SCREENS.find(screen => screen.name === name);

// Export group names for type safety
export type ScreenGroupNames = keyof ScreensByGroupType;
export const SCREEN_GROUP_NAMES: readonly ScreenGroupNames[] = Object.keys(SCREENS_BY_GROUP) as ScreenGroupNames[];
`;
  }

  /**
   * Generate screens by group code and type definitions
   */
  generateScreensByGroupCode(screenConfigs) {
    const groups = {};

    screenConfigs.forEach((config, index) => {
      const group = config.group;
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(index);
    });

    const screensByGroupCode = Object.entries(groups)
      .map(([group, indices]) => {
        const screenRefs = indices.map((index) => `SCREENS[${index}]`).join(', ');
        return `  '${group}': [${screenRefs}]`;
      })
      .join(',\n');

    const screensByGroupType = Object.entries(groups)
      .map(([group, indices]) => {
        const screenTypes = indices.map((index) => `typeof SCREENS[${index}]`).join(', ');
        return `  readonly '${group}': readonly [${screenTypes}]`;
      })
      .join(';\n');

    return {
      screensByGroupCode,
      screensByGroupType,
    };
  }

  /**
   * Setup file watcher for development
   */
  setupWatcher() {
    console.log('👀 Watching for changes...');

    const watcher = chokidar.watch(this.config.featuresDir, {
      ignored: /node_modules/,
      persistent: true,
    });

    const handleChange = async () => {
      // Debounce rapid changes
      const now = Date.now();
      if (now - this.lastGeneration < 1000) {
        return;
      }
      this.lastGeneration = now;

      console.log('🔄 Screen files changed, regenerating registry...');
      await this.scanScreens();
    };

    watcher.on('add', handleChange).on('change', handleChange).on('unlink', handleChange);
  }

  /**
   * Ensure output directory exists
   */
  async ensureOutputDir() {
    const outputDir = path.dirname(this.config.outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  }
}

// Run the scanner
if (require.main === module) {
  const scanner = new ScreenScanner();
  scanner.run().catch(console.error);
}

module.exports = ScreenScanner;
