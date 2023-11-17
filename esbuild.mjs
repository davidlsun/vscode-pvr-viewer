import * as esbuild from 'esbuild';

const baseConfig = {
    bundle: true,
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'production' ? false : 'inline'
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
    platform: 'browser',
    entryPoints: ['./src/webview/main.ts'],
    outfile: './out/webview.js'
};

(async () => {
    const args = process.argv.slice(2);
    if (args.includes('--watch')) {
        //  build and watch extension and webview code
        await (await esbuild.context(extensionConfig)).watch();
        await (await esbuild.context(webviewConfig)).watch();
        console.log('watch started');
    } else {
        // build extension and webview code
        await esbuild.build(extensionConfig);
        await esbuild.build(webviewConfig);
        console.log('build complete');
    }
})();