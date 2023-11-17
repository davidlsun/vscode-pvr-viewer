import { build } from 'esbuild';

const baseConfig = {
    bundle: true,
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV !== 'production'
};

const extensionConfig = {
    ...baseConfig,
    platform: 'node',
    entryPoints: ['./src/extension.ts'],
    outfile: './out/extension.js',
    external: ['vscode']
};

const webviewConfig = {
    ...baseConfig,
    entryPoints: ['./src/webview/main.ts'],
    outfile: './out/webview.js'
};

(async () => {
    const args = process.argv.slice(2);
    try {
        if (args.includes('--watch')) {
            //  build and watch extension and webview code
            await context(extensionConfig).watch();
            await context(webviewConfig).watch();
            console.log('watch started');
        } else {
            // build extension and webview code
            await build(extensionConfig);
            await build(webviewConfig);
            console.log('build complete');
        }
    } catch (err) {
        process.stderr.write(err.stderr);
        process.exit(1);
    }
})();