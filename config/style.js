const path = require("path");

const defaultConfig = {
    outputPath: "./",
    isProduction: false
};

module.exports = function (eleventyConfig, options = {}) {

    // sobreescribimos las opciones por defecto por las opciones proporcionadas por el usuario
    options = {...defaultConfig, ...options};

    eleventyConfig.addPlugin(require("eleventy-plugin-sass"), {
        outputDir: path.join(options.outputPath, "styles"),

        // indicamos si queremos remapear las rutas
        remap: true,

        // indicamos si queremos generar sourcemaps
        sourceMaps: !options.isProduction,

        // indicamos si queremos usar el módulo cleanCSS
        cleanCSS: options.isProduction,
    });

};