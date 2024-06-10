const webpack = require('webpack');

module.exports = function override(config, env) {
    // Polyfill for process
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]);

    // Extend existing fallback configuration to include 'vm'
    config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        vm: require.resolve('vm-browserify'), // Add this line
    };

    return config;
};