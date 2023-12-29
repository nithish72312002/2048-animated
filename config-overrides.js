// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  fallback["process/browser"] = require.resolve("process/browser");
  fallback["http"] = require.resolve("stream-http");
  fallback["https"] = require.resolve("https-browserify");
  fallback["zlib"] = require.resolve("browserify-zlib");

  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);

  return config;
};
