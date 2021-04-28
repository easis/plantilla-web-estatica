const UserConfig = require('@11ty/eleventy');

const fs = require('fs').promises;

const defaultConfig = {
    isDevelopment: false,
    errorPageFile: false,
    serverIp: 'localhost',
    serverPort: 6023
};

/**
 * Inicio de la configuración en entorno de depuración de eleventy.
 * @param {UserConfig} eleventyConfig Configuración de eleventy 
 * @param {any} options Opciones de configuración
 */
module.exports = (eleventyConfig, options = {}) => {

    // sobreescribimos las opciones por defecto por las opciones proporcionadas por el usuario
    options = {...defaultConfig, ...options};

    // configuración que solo se aplica en modo de desarrollo
    if (!options.isDevelopment) {
        return;
    }

    let browserSyncCallbacks = {};
    if (options.errorPageFile !== false) {
        // https://github.com/11ty/eleventy-base-blog/blob/c10b171a40726e415bf5ad839fab925e53a52272/.eleventy.js#L77
        browserSyncCallbacks = {

            ready: async (error, browserSync) => {
                if(error) {
                    console.error(error);
                }

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

    // https://browsersync.io/docs/options
    eleventyConfig.setBrowserSyncConfig({
        // desactivamos el panel de administración
        ui: false,

        // desactivamos el modo ghost
        ghost: false,

        // definimos los callbacks
        callbacks: browserSyncCallbacks,

        // solo se mostrará en local, lo que acelera el tiempo de carga
        online: false,

        // indicamos que queremos abrir la página en el navegador
        // las opciones disponibles son: local, external, ui, tunnel
        open: "local",

        // indicamos qué navegador(es) queremos abrir
        //browser: "firefox", // [ "firefox", "chrome" ]

        // indicamos si queremos que se recarguen los navegadores al reiniciar BrowserSync
        reloadOnRestart: true,

        // indicamos si queremos que nos muestre notificaciones (de Windows, por ejemplo)
        notify: false,

        // conexión del servidor (ip y puerto)
        host: options.serverIp,
        port: options.serverPort,
    });
}