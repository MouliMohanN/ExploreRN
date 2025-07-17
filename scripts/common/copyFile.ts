import * as fs from 'fs';
import * as path from 'path';

// Parse named params: --source=xxx --destination=yyy
const args = process.argv.slice(2);
const params: Record<string, string> = {};

args.forEach(arg => {
  const [key, value] = arg.replace(/^--/, '').split('=');
  if (key && value) {
    params[key] = value;
  }
});

const source = params['source'];
const destination = params['destination'];

if (!source || !destination) {
  console.error('❌ Usage: ts-node copyContent.ts --source=source.txt --destination=destination.txt');
  process.exit(1);
}

const sourcePath = path.resolve(__dirname, source);
const destinationPath = path.resolve(__dirname, destination);

try {
  const data: string = fs.readFileSync(sourcePath, 'utf8');
  fs.writeFileSync(destinationPath, data, 'utf8');
  console.log(`✅ Content copied from ${sourcePath} to ${destinationPath}`);
} catch (err: unknown) {
  if (err instanceof Error) {
    console.error(`❌ Error: ${err.message}`);
  } else {
    console.error('❌ Unknown error occurred.');
  }
}
