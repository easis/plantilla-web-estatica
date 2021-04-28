
const sourcePath = 'src';
const outputPath = 'dist';

module.exports = {
    isProduction: (process.env.NODE_ENV === "production"),
    source: {
        path: sourcePath
    },
    output: {
        path: outputPath
    },

    applyCustomConfig: (eleventyConfig) => {
        require('./config/debug')(eleventyConfig, {
            isDevelopment: !this.isProduction
        });
    }
};