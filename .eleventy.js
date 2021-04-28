const { UserConfig } = require('@11ty/eleventy');

const Config = require('./config');

/**
 * Inicio de la configuración de eleventy.
 * @param {UserConfig} eleventyConfig 
 */
function doConfig(eleventyConfig) {

    // añadimos la configuración propia
    Config.applyCustomConfig(eleventyConfig);

    return {
        // configuración de directorios
        dir: {
            // directorio donde están los archivos a compilar
            input: Config.source.path,

            // directorio donde se guardarán los archivos compilados
            output: Config.output.path,
        },

        // indicamos que queremos preprocesar los archivos html con nunjucks
        htmlTemplateEngine: "njk"
    };
}

module.exports = doConfig;