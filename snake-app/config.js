'use strict';

const path = require('path');

let config = {
    // Name of electron app
    // Will be used in production builds
    name: 'Snake',

    // Use ESLint (extends `standard`)
    // Further changes can be made in `.eslintrc.js`
    eslint: true,

    // webpack-dev-server port
    port: 9080,

    // electron-packager options
    building: {
        arch: 'x64',
        asar: true,
        dir: path.join(__dirname, 'app'),
        // icon: path.join(__dirname, 'app/icons/icon'),
        ignore: /\b(src|index\.ejs|icons)\b/,
        out: path.join(__dirname, 'builds'),
        overwrite: true,
        platform: process.env.PLATFORM_TARGET || 'all'
    }
};

config.building.name = config.name;

module.exports = config;