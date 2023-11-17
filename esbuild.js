const { build } = require('esbuild');

const baseConfig = {
    bundle: true,
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV !== 'production'
};

const extensionConfig = {
    ...baseConfig,
    platform: 'node',
    mainFields: ['module', 'main'],
    format: 'cjs',
    entryPoints: ['./src/extension.ts'],
    outfile: './out/extension.js',
    external: ['vscode']
};

const webviewConfig = {
    ...baseConfig,
    target: 'es2020',
    format: 'esm',
    entryPoints: ['./src/webview/main.ts'],
    outfile: './out/webview.js'
};

const watchConfig = {
    watch: {
        onRebuild(error, result) {
            console.log('[WATCH] build started');
            if (error) {
                error.errors.forEach(error => {
                    console.error(`> ${error.location.file}:${error.location.line}:${error.location.column}: error: ${error.text}`);
                });
            } else {
                console.log('[WATCH] build finished');
            }
        }
    }
};

(async () => {
    const args = process.argv.slice(2);
    try {
        if (args.includes('--watch')) {
            //  build and watch extension and webview code
            console.log('[WATCH] build started');
            await build({
                ...extensionConfig,
                //...watchConfig
            });
            await build({
                ...webviewConfig,
                //...watchConfig
            });
            console.log('[WATCH] build finished');
        } else {
            // build extension and webview code
            await build(extensionConfig);
            await build(webviewConfig);
            console.log('BUILD complete');
        }
    } catch (err) {
        process.stderr.write(err.stderr);
        process.exit(1);
    }
})();