const { exec, spawn, ChildProcess } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const net = require('net');

const execAsync = promisify(exec);

const ROOT_DIR = path.join(__dirname, '..', '..', '..');
const APP_BUILD_OUTPUTS_DIR = path.join(ROOT_DIR, 'android', 'app', 'build', 'outputs', 'apk', 'debug');

let metroProcess: import('child_process').ChildProcess | null = null;
let androidRunProcess: import('child_process').ChildProcess | null = null;

const isMetroRunning = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const client = new net.Socket();
    client.once('connect', () => {
      client.end();
      resolve(true);
    });
    client.once('error', () => {
      resolve(false);
    });
    client.connect(8081, '127.0.0.1');
  });
};

const getDeviceAbi = async (): Promise<string> => {
  try {
    const { stdout } = await execAsync('adb shell getprop ro.product.cpu.abi');
    const abi = stdout.trim();
    if (abi) {
      console.log(`Detected device ABI: ${abi}`);
      return abi;
    } else {
      console.warn('Could not detect device ABI. Defaulting to arm64-v8a.');
      return 'arm64-v8a';
    }
  } catch (error) {
    console.error('Error detecting device ABI:', error);
    return 'arm64-v8a'; // Default in case of error
  }
};

const findApkForAbi = (abi: string): string | null => {
  const expectedApkName = `app-${abi}-debug.apk`;
  try {
    const files = fs.readdirSync(APP_BUILD_OUTPUTS_DIR);
    const apkFile = files.find((file: string) => file.includes(expectedApkName));
    if (apkFile) {
      const apkPath = path.join(APP_BUILD_OUTPUTS_DIR, apkFile);
      console.log(`Found APK for ${abi}: ${apkPath}`);
      return apkPath;
    }
  } catch (error: any) {
    console.warn(`Could not read APK directory or find APK for ${abi}:`, error.message);
  }
  return null;
};

const installApk = async (apkPath: string) => {
  console.log(`Installing APK: ${apkPath}`);
  await execAsync(`adb install -r "${apkPath}"`, { stdio: 'inherit' });
  console.log('APK installed successfully.');
};

const cleanup = () => {
  console.log('\nInitiating cleanup...');
  if (metroProcess && !metroProcess.killed) {
    console.log('Stopping Metro bundler...');
    metroProcess.kill();
  }
  if (androidRunProcess && !androidRunProcess.killed) {
    console.log('Stopping Android run process...');
    androidRunProcess.kill();
  }
  console.log('Cleanup finished. Exiting.');
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

const run = async () => {
  try {
    // 1. Start Metro bundler (if not already running)
    const metroAlreadyRunning = await isMetroRunning();
    if (metroAlreadyRunning) {
      console.log('Metro bundler is already running. Skipping start.');
    } else {
      console.log('Starting Metro bundler in the background...');
      metroProcess = exec('npm start', { cwd: ROOT_DIR });
    }

    // 2. Detect device ABI
    const deviceAbi = await getDeviceAbi();

    // 3. Check for existing APK and install, or run react-native run-android
    const apkPath = findApkForAbi(deviceAbi);
    if (apkPath) {
      await installApk(apkPath);
      console.log('Adding a short delay after installation...');
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay

      const connectMetroResult = await execAsync('npm run adb-connect', { cwd: ROOT_DIR });
      console.log('adb-connect output:', connectMetroResult.stdout, connectMetroResult.stderr);

      console.log('Opening app and connecting to Metro...');
      const openAppResult = await execAsync('npm run adb-open-app', { cwd: ROOT_DIR });
      console.log('adb-open-app output:', openAppResult.stdout, openAppResult.stderr);
    } else {
      console.log(`No pre-built APK found for ${deviceAbi}. Running 'npx react-native run-android'...`);
      // This command will build and install the app
      const androidRunProcess = spawn('npx react-native run-android', [], {
        cwd: ROOT_DIR,
        stdio: 'inherit',
        shell: true,
      });

      await new Promise<void>((resolve, reject) => {
        androidRunProcess.on('close', (code: number | null) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`'npx react-native run-android' exited with code ${code}`));
          }
        });
        androidRunProcess.on('error', (err: Error) => {
          reject(err);
        });
      });
    }

    console.log('Operation completed.');
  } catch (error: any) {
    console.error('An error occurred:', error);
  } finally {
    cleanup();
  }
};

run();
