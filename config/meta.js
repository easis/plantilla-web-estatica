const chalk = require("chalk");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const fs = require('fs')

/**
 * Referencias:
 *  https://html.spec.whatwg.org/multipage/semantics.html#standard-metadata-names
 */

/**
 * Inicio de la configuración de las metaetiquetas.
 * @param {Userconfig} eleventyConfig 
 * @param {MetaOptions} options
 */
module.exports = function (eleventyConfig, options = {}) {

    const favicons = [];
    const faviconsMetadata = [];

    if (options.faviconPath && fs.existsSync(options.faviconPath)) {

        const genericWidths = [32, 57, 76, 96, 128, 192, 228, 512];
        const androidWidths = [196];
        const iosWidths = [120, 152, 180];
        const windows = [76, 144, 228];

        const faviconOutputPath = path.join(options.outputPath || "", options.faviconOutputDirectory || "").split(path.sep).join(path.posix.sep) || "./";

        generateFavicon(options.faviconPath, faviconOutputPath, width = genericWidths)
            .then(r => {
                faviconsMetadata.push(...r.png);

                favicons.push(`<!-- GENÉRICOS -->`);
                favicons.push(...generateFaviconHtml(r, "icon", options.faviconOutputDirectory));
                favicons.push(`<!-- /GENÉRICOS -->`);
            });

        generateFavicon(options.faviconPath, faviconOutputPath, width = androidWidths)
            .then(r => {
                faviconsMetadata.push(...r.png);

                favicons.push(`<!-- ANDROID -->`);
                favicons.push(...generateFaviconHtml(r, "shortcut icon", options.faviconOutputDirectory));
                favicons.push(`<!-- /ANDROID -->`);
            });



        generateFavicon(options.faviconPath, faviconOutputPath, width = iosWidths)
            .then(r => {
                faviconsMetadata.push(...r.png);

                favicons.push(`<!-- iOS -->`);
                favicons.push(...generateFaviconHtml(r, "apple-touch-icon", options.faviconOutputDirectory));
                favicons.push(`<!-- /iOS -->`);
            });

        generateFavicon(options.faviconPath, faviconOutputPath, width = windows)
            .then(r => {
                faviconsMetadata.push(...r.png);

                favicons.push(`<!-- WINDOWS 8 & IE 10 -->`);
                favicons.push(...generateFaviconHtml(r, "msapplication-TileImage", options.faviconOutputDirectory));

                if (options.themeColor) {
                    favicons.push(`<meta name="msapplication-TileColor" content="${options.themeColor}">`);
                }

                favicons.push(`<!-- /WINDOWS 8 & IE 10 -->`);
            });

        favicons.push(`<!-- WINDOWS 8.1 & IE 11+ -->`);
        favicons.push('<meta name="msapplication-config" content="browserconfig.xml" />');
        favicons.push(`<!-- /WINDOWS 8.1 & IE 11+ -->`);
    }

    // añadimos el shortocde para generar las etiquetas meta
    eleventyConfig.addShortcode("meta", function () {
        const tags = [];

        tags.push(`<meta name="generator" content="https://github.com/easis/plantilla-web-estatica">`);
        if (options.author) tags.push(`<meta name="author" content="${options.author}">`);
        if (options.description) tags.push(`<meta name="description" content="${options.description}">`);
        if (options.keywords) tags.push(`<meta name="keywords" content="${options.keywords.join(", ")}">`);
        if (options.themeColor) tags.push(`<meta name="theme-color" content="${options.themeColor}">`);
        if (options.colorSchema) tags.push(`<meta name="color-schema" content="${options.colorSchema}">`);

        options.distribution = getDefault('distribution', options.distribution, ["global", "local", "iu"], null);
        if (options.distribution) {
            tags.push(`<meta name="distribution" content="${options.distribution}">`);
        }

        options.colorSchema = getDefault('colorScheme', options.colorSchema, ["normal", "light", "dark"], null);
        if (options.colorSchema) {
            tags.push(`<meta name="color-schema" content="${options.colorSchema}">`);
        }

        return tags.join("\n");
    });

    eleventyConfig.addShortcode("favicons", function () {
        if (favicons.length == 0) {
            return;
        }

        return favicons.join("\n");
    });

    eleventyConfig.addShortcode("browserconfig_favicon", function (width, name) {
        if (faviconsMetadata.length == 0) {
            console.warn(
                chalk.bgBlueBright.white('plantilla-web-estatica'),
                chalk.black.bgYellowBright("ADVERTENCIA"),
                "No se han encontrado metadatos de favicons"
            );

            return "";
        }

        for (let m of faviconsMetadata) {
            if (!m || !m.outputPath) continue;
            if (m.width != width) continue;

            return `<${name} src="${m.filename}" />`;
        }

        return "";
    });

    eleventyConfig.addShortcode("browserconfig_theme_color", function () {
        if (options.themeColor) {
            return `<TileColor>${options.themeColor}</TileColor>`;
        }

        return "";
    });

    eleventyConfig.addShortcode("manifest_icons", function () {
        const manifestIcons = [];

        for (let icon of faviconsMetadata) {
            const i = {
                src: path.join(options.faviconOutputDirectory || "", icon.filename).split(path.sep).join(path.posix.sep),
                type: icon.sourceType,
                sizes: `${icon.width}x${icon.height}`,
            };

            if (icon.width == 144) {
                i.purpose = "any maskable";
            }

            manifestIcons.push(i);
        }

        return JSON.stringify(manifestIcons, null, 4);
    });

    eleventyConfig.addShortcode("meta_title", () => options.title);
    eleventyConfig.addShortcode("meta_description", () => options.description);
    eleventyConfig.addShortcode("meta_theme_color", () => options.themeColor);
    eleventyConfig.addShortcode("meta_background_color", () => options.backgroundColor);

}

/**
 * 
 * @param {string} faviconPath Ruta del favicon original.
 * @param {string} outputPath Ruta donde se guardarán todos los favicons generados.
 * @param {number[]} widths Lista de tamaños a exportar.
 * @param {string[]} formats Lista de formatos a exportar.
 * @returns 
 */
async function generateFavicon(faviconPath, outputPath, widths, formats = ["png"]) {
    let metadata = await Image(faviconPath, {
        widths: widths,
        formats: formats,
        outputDir: outputPath,
        filenameFormat: function (id, src, width, format, options) {
            return `favicon-${width}.${format}`;
        }
    });

    return metadata;
}

/**
 * Genera el elemento HTML "link" para los iconos.
 * @param {any} result 
 * @param {string} rel Valor del atributo "rel".
 * @param {string} outputPath Directorio donde está el archivo.
 * @returns {string[]} Array de elementos HTML "link".
 */
function generateFaviconHtml(result, rel, outputPath) {
    if (!result || !result.png) {
        return [];
    }

    const favicons = [];
    for (const icon of result.png) {        
        const iconPath = path.join(outputPath, icon.filename).split(path.sep).join(path.posix.sep);;
        favicons.push(`<link rel="${rel}" href="${iconPath}" sizes="${icon.width}x${icon.height}">`);
    }

    return favicons;
}

/**
 * Valida un valor dadas las opciones y devuelve el valor o un valor por defecto.
 * @param {string} tagName Nombre de la etiqueta.
 * @param {string} value Valor proporcionado por el usuario
 * @param {string[]} options Opciones válidas
 * @param {string|null} defaultValue Valor por defecto a asignar si el valor proporcionado no es válido
 * @return {string} El valor por defecto.
 */
function getDefault(tagName, value, options, defaultValue = null) {
    if (!value) {
        return null;
    }

    let lowerValue = value.toLowerCase();

    if (!options.filter(o => o.toLowerCase()).includes(lowerValue)) {
        distribution = "global";
        console.warn(
            chalk.bgBlueBright.white('plantilla-web-estatica'),
            chalk.black.bgYellowBright("ADVERTENCIA"),
            `La metaetiqueta '${tagName}' debe contener uno de los siguientes valores:`, options,
            "\n\tEl valor proporcionado es: ", chalk.red(value),
            "\n\tSe asignará el valor: ", chalk.green(defaultValue)
        );

        return defaultValue;
    }

    return value;
}

/**
 * @typedef {Object} MetaOptions
 * @property {string} outputPath Ruta de salida.
 * @property {string} title Título por defecto.
 * @property {string} author Autor de la página.
 * @property {string} description Descripción de la página. Esta descripción se usará para la etiqueta "description", para Open Graph, Twitter Card, etc.
 * @property {string} language Idioma de la página. Debe ser en formato corto (ej: es para español, en para inglés, etc)
 * @property {string} distribution Indica el alcance de la página web. Los posibles valores son: globa, local e iu (internal use).
 * @property {string[]} keywords Palabras clave que se usan para encontrar la página web.
 * @property {string} themeColor Color primario. Debe ser un color CSS válido: hexadecimal o rgb(a).
 * @property {string} backgroundColor Color del fondo que se usa para PWAs. Debe ser un color CSS válido: hexadecimal o rgb(a).
 * @property {("normal"|"light"|"dark")} colorSchema Esquema de color a utilizar.
 * @property {string} faviconPath Ruta al favicon a utilizar. Esta imagen se usará para generar otros iconos de relevancia.
 * @property {stirng} faviconOutputDirectory Ruta donde se guardarán los favicons generados. Debe ser un directorio dentro de la carpeta de salida.
 */