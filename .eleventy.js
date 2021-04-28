const { UserConfig } = require('@11ty/eleventy');
const chalk = require('chalk');
const Config = require('./config');

/**
 * Inicio de la configuración de eleventy.
 * @param {UserConfig} eleventyConfig 
 */
function doConfig(eleventyConfig) {

    console.debug(chalk.bgBlueBright.white('plantilla-web-estatica'), chalk.blue('INICIO')), Config;
    console.debug(chalk.bgBlueBright.white('plantilla-web-estatica'), 'Modo: ', Config.isProduction ? chalk.green('PRODUCCIÓN') : chalk.yellow('DESARROLLO'));
 
    // añadimos la configuración propia
    Config.applyCustomConfig(eleventyConfig);

    return {
        // configuración de directorios
        dir: {
            // directorio donde están los archivos a compilar
            input: Config.source.path,

            // directorio con las plantillas que se pueden incluir
            includes: Config.source.includes,

            // directorio donde se guardarán los archivos compilados
            output: Config.output.path,
        },

        // indicamos que queremos preprocesar los archivos html y markdown con nunjucks
        htmlTemplateEngine: "njk",
        markdownTemplateEngine : "njk",

        // lista de extensiones procesará eleventy
        templateFormats: [ "md", "njk", "html", "liquid" ],
    };
}

module.exports = doConfig;