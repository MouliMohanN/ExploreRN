const { exec, ChildProcess } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const execAsync = promisify(exec);

const ROOT_DIR = path.join(__dirname, '..', '..', '..');
const SCRIPT_DIR = __dirname;
const APP_BUILD_GRADLE_PATH = path.join(ROOT_DIR, 'android', 'app', 'build.gradle');
const DEBUG_BUILD_GRADLE_PATH = path.join(SCRIPT_DIR, 'config', 'debugBuild.gradle');

let metroProcess: import('child_process').ChildProcess | null = null;
let androidBuildProcess: import('child_process').ChildProcess | null = null;
let originalBuildGradleContent: string | null = null;

const cleanup = () => {
  console.log('\nInitiating cleanup...');

  if (metroProcess && !metroProcess.killed) {
    console.log('Stopping Metro bundler...');
    metroProcess.kill();
  }

  if (androidBuildProcess && !androidBuildProcess.killed) {
    console.log('Stopping Android build process...');
    androidBuildProcess.kill();
  }

  if (originalBuildGradleContent) {
    console.log('Reverting android/app/build.gradle...');
    try {
      fs.writeFileSync(APP_BUILD_GRADLE_PATH, originalBuildGradleContent, 'utf8');
      console.log('Successfully reverted android/app/build.gradle.');
    } catch (writeError) {
      console.error('Failed to revert android/app/build.gradle:', writeError);
    }
  }
  
  console.log('Cleanup finished. Exiting.');
  process.exit();
};

// Handle Ctrl+C and other terminations
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

const run = async () => {
  try {
    // 1. Start Metro bundler
    console.log('Starting Metro bundler in the background...');
    metroProcess = exec('npm start', { cwd: ROOT_DIR });

    // Give metro a moment to start up.
    console.log('Waiting for Metro bundler to initialize (8s)...');
    await new Promise(resolve => setTimeout(resolve, 8000));

    // 2. Backup the original build.gradle
    console.log('Backing up original android/app/build.gradle...');
    originalBuildGradleContent = fs.readFileSync(APP_BUILD_GRADLE_PATH, 'utf8');

    // 3. Copy the debug build.gradle over
    console.log('Copying debug build.gradle...');
    const debugGradleContent = fs.readFileSync(DEBUG_BUILD_GRADLE_PATH, 'utf8');
    fs.writeFileSync(APP_BUILD_GRADLE_PATH, debugGradleContent, 'utf8');

    // 4. Run the android app
    console.log('Building and running the app on the connected device (active architecture only)...');
    androidBuildProcess = exec('npx react-native run-android --active-arch-only', { cwd: ROOT_DIR });

    if (!androidBuildProcess) {
      throw new Error('Failed to start Android build process.');
    }

    await new Promise<void>((resolve, reject) => {
      androidBuildProcess!.on('exit', (code: number | null, signal: string | null) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Android build process exited with code ${code || signal}`));
        }
      });
      androidBuildProcess!.on('error', (err: Error) => {
        reject(err);
      });
    });

    console.log('Build successful. Now you can start debugging.');

  } catch (error: any) {
    if (!error.killed) {
        console.error('An error occurred during the build process:', error);
    }
  } finally {
    cleanup();
  }
};

run();