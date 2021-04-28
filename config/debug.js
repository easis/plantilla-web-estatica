const UserConfig = require('@11ty/eleventy');

const fs = require('fs').promises;

const defaultConfig = {
    isDevelopment: false,
    errorPageFile: false
};

/**
 * Inicio de la configuración en entorno de depuración de eleventy.
 * @param {UserConfig} eleventyConfig Configuración de eleventy 
 * @param {bool} isDevelopment Indica si el entorno es de desarrollo
 */
module.exports = (eleventyConfig, options = {}) => {

    // sobreescribimos las opciones por defecto por las opciones proporcionadas por el usuario
    options = {...defaultConfig, options};

    // configuración que solo se aplica en modo de desarrollo

    if (!options.isDevelopment) {
        return;
    }

    let browserSyncCallbacks = {};
    if (options.errorPageFile !== false) {
        // https://github.com/11ty/eleventy-base-blog/blob/c10b171a40726e415bf5ad839fab925e53a52272/.eleventy.js#L77
        browserSyncCallbacks = {

            ready: async (error, browserSync) => {
                const errorPageContent = await fs.readFile(options.errorPageFile);
                if (errorPageContent) {
                    browserSync.addMiddleware("*", (request, response) => {
                        response.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
                        response.write(content_404);
                        response.end();
                    });
                }
            }

        };
    }

    eleventyConfig.setBrowserSync({
        // desactivamos el panel de administración
        ui: false,

        // desactivamos el modo ghost
        ghost: false,

        callbacks: browserSyncCallbacks
    });
}