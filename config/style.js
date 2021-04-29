const path = require("path");

const defaultConfig = {
    outputPath: "./",
    isProduction: false
};

module.exports = function (eleventyConfig, options = {}) {

    // sobreescribimos las opciones por defecto por las opciones proporcionadas por el usuario
    options = {...defaultConfig, ...options};

    const stylesPath = path.join(options.outputPath, "styles");

    eleventyConfig.addPlugin(require("eleventy-plugin-sass"), {
        outputDir: stylesPath,

        // indicamos si queremos remapear las rutas
        remap: true,

        // indicamos si queremos generar sourcemaps
        sourceMaps: !options.isProduction,

        // indicamos si queremos usar el módulo cleanCSS
        cleanCSS: options.isProduction,

        // opciones para pasar a libSass
        sassOptions: {
            outputStyle: options.isProduction ? "compressed" : "expanded", // valores posibles: nested, expanded, compact, compressed
        }
    });

};