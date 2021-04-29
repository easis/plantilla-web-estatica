const path = require("path");

const defaultConfig = {
    inputPath: "./",
    outputPath: "./",
    isProduction: false
};

module.exports = function (eleventyConfig, options = {}) {

    // sobreescribimos las opciones por defecto por las opciones proporcionadas por el usuario
    options = {...defaultConfig, ...options};

    const inputScriptsPath = path.join(options.inputPath, "scripts");
    const outputScriptsPath = path.join(options.outputPath, "scripts");

    eleventyConfig.addPlugin(require("eleventy-plugin-babel"), {
        outputDir: outputScriptsPath,

        // indicamos qué archivos queremos monitorizar
        watch: [
            `${inputScriptsPath}/**/*.js`,
            "!node_modules/**"
        ],

        // indicamos si queremos generar sourceMaps
        sourceMaps: !options.isProduction,

        // indicamos si queremos minificar el código
        uglify: options.isProduction,
    });

};