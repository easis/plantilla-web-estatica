const path = require('path');

/// source
const sourcePath = 'src';

/// output
const outputPath = 'dist';

// otros
const isProduction = (process.env.NODE_ENV === "production")

module.exports = {
    isProduction: isProduction,

    source: {
        path: sourcePath,
        includes: "_includes"
    },
    output: {
        path: outputPath
    },

    applyCustomConfig: (eleventyConfig) => {
        const configDebug = require('./config/debug');
        configDebug(eleventyConfig, {
            isProduction: isProduction
        });

        const configStyle = require('./config/style');
        configStyle(eleventyConfig, {
            outputPath: outputPath,
            isProduction: isProduction
        });
    }
};