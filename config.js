const path = require("path");

// otros
const assetsDirectoryName = "assets";
const isProduction = (process.env.NODE_ENV === "production")

/// source
const sourcePath = "src";
const sourceAssetsPath = path.join(sourcePath, assetsDirectoryName);

/// output
const outputPath = "dist";

module.exports = {
    isProduction: isProduction,

    source: {
        path: sourcePath,
        assets: sourceAssetsPath,
        includes: "_includes"
    },
    output: {
        path: outputPath,
    },

    applyCustomConfig: (eleventyConfig) => {
        const configDebug = require('./config/debug');
        configDebug(eleventyConfig, {
            isProduction: isProduction
        });

        const configStyle = require('./config/style');
        configStyle(eleventyConfig, {
            rootPath: __dirname,
            inputPath: path.join(sourceAssetsPath, "styles").split(path.sep).join(path.posix.sep),
            outputPath: path.join(outputPath, "styles").split(path.sep).join(path.posix.sep),
            isProduction: isProduction
        });

        const configScripts = require("./config/scripts");
        configScripts(eleventyConfig, {
            rootPath: __dirname,
            inputPath: sourceAssetsPath,
            outputPath: outputPath,
            isProduction: isProduction
        });

        const configMeta = require("./config/meta");
        configMeta(eleventyConfig, {
            outputPath: outputPath,
            author: "Erik Asís",
            distribution: "local",
            faviconPath: path.join(sourcePath, "favicon.png"),
            faviconOutputDirectory: "images/",
            themeColor: "#e8e8e8",
            backgroundColor: "#ffffff",
        });
    }
};