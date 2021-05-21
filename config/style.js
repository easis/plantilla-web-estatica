const path = require("path");

const defaultConfig = {
    rootPath: "./",
    inputPath: "./src",
    outputPath: "./_site",
    isProduction: false
};

module.exports = function (eleventyConfig, options = {}) {

    // sobreescribimos las opciones por defecto por las opciones proporcionadas por el usuario
    options = { ...defaultConfig, ...options };

    const nodeModulesPath = path.resolve(options.rootPath, "node_modules");

    eleventyConfig.on("beforeBuild", () => {
        // Custom Code
    });

    eleventyConfig.addPlugin(require("eleventy-plugin-sass"), {
        // ruta donde se escribirán los archivo
        outputDir: options.outputPath,

        // indicamos si queremos remapear las rutas
        remap: true,

        // indicamos si queremos generar sourcemaps
        sourceMaps: !options.isProduction,

        // indicamos si queremos usar el módulo cleanCSS
        cleanCSS: options.isProduction,

        // opciones para pasar a libSass
        sassOptions: {
            outputStyle: options.isProduction ? "compressed" : "expanded", // valores posibles: nested, expanded, compact, compressed,

            // indicamos las carpetas que queremos que LibSass incluya
            includePaths: [
                // indicamos la ruta node_modules
                `${nodeModulesPath}`
            ]
        }
    });


};