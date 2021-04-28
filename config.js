const path = require('path');

/// source
const sourcePath = 'src';

/// output
const outputPath = 'dist';

module.exports = {
    isProduction: (process.env.NODE_ENV === "production"),
    
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
            isDevelopment: !this.isProduction
        });
    }
};