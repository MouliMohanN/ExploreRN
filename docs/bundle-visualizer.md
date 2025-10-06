react-native-bundle-visualizer

This project has `react-native-bundle-visualizer` installed as a dev dependency. The visualizer helps inspect the JavaScript bundle produced by Metro (what contributes to size, module graph, etc.).

Added npm scripts

- `npm run bundle:visualize` - generic script (defaults to android platform in this repo) producing `bundle-visualizer.html`.
- `npm run bundle:visualize:android` - explicit Android bundle output file `bundle-visualizer-android.html`.
- `npm run bundle:visualize:ios` - explicit iOS bundle output file `bundle-visualizer-ios.html`.

Quick usage

1. Install dependencies (if not already):

```bash
npm install
```

2. Build a production JS bundle and open the visualizer (example Android):

```bash
npm run bundle:visualize:android
# After it finishes, open bundle-visualizer-android.html in your browser
open bundle-visualizer-android.html
```

What the scripts do

The `react-native-bundle-visualizer` wrapper will run Metro to produce a JS bundle for the given platform and then open or write an HTML report showing bundle contents and sizes.

Notes about config compatibility

- Metro config: your `metro.config.js` uses `unstable_enablePackageExports` which is fine. The visualizer invokes Metro programmatically or via CLI; this flag shouldn't block it.
- Babel config: you have `babel-plugin-react-compiler` and `react-native-worklets/plugin` plugins. The bundle visualizer just analyzes the bundle output; if your Babel plugins transform things before bundling, the reported module sources will reflect the transformed output. If you hit missing module resolution errors while bundling for analysis, try temporarily disabling non-essential Babel plugins.

Troubleshooting

- "Cannot find entry file" errors: ensure `--entry-file` points to a valid file. The scripts use `index.js` which exists at repo root; if your app entry is `App.tsx`, change the scripts to use `--entry-file index.tsx` or `App.tsx` accordingly.
- Metro port / server conflicts: stop any running Metro server (Ctrl+C) before running the visualizer scripts. They normally spawn their own bundling process.
- Native modules / assets: if your bundle build fails due to native module linking or assets, make sure you run the bundler in a way that matches your app config (dev vs production) and that any required assets are accessible.

Advanced flags

You can pass additional flags through the CLI, for example:

```bash
npx react-native-bundle-visualizer --entry-file index.js --platform android --bundle-output android-index.bundle --sourcemap-output android-index.map --output report.html --dev false
```

If you'd like, I can:

- Run a sample visualizer invocation here and share the produced HTML (if you want me to run it in this environment), or
- Update the scripts to detect `App.tsx` / TypeScript entry automatically.
