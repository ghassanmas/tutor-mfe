const { merge } = require('webpack-merge');
const fs = require('fs');
const path = require('path');

const baseProdConfig = (
  fs.existsSync('./webpack.prod.config.js')
    ? require('./webpack.prod.config.js')
    : require('@edx/frontend-build/config/webpack.prod.config.js')
);

{% if not MFE_REMOVE_WEBPACK_BUILD_CACHE  %}
// This shall boost rebuild time for subsequent builds.
// Ref docs: https://webpack.js.org/configuration/cache/#cachecachedirectory
baseProdConfig.cache= {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname,'.cache'), 
},
{% endif %}

// Disable Unnecessary Plgugins
baseProdConfig.plugins = baseProdConfig.plugins
.filter(plugin => (plugin.constructor.name !== 'NewRelicPlugin'))
.filter(plugin => (plugin.constructor.name !== 'HtmlWebpackNewRelicPlugin'))
.filter(plugin => (plugin.constructor.name !== 'BundleAnalyzerPlugin'));

// Don't generate/incldue .map files _Reduces dist to ~-70%_
baseProdConfig.devtool = false;

module.exports = baseProdConfig;