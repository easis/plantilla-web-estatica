const Image = require("@11ty/eleventy-img");

async function generateFavicon(faviconPath) {
    let metadata = await Image(faviconPath, {
        widths: [
            32,     // Standard for most desktop browsers (replaces 16×16)
            48,
            72,
            96,     // Firefox "Top Sites"
            128,    // Chrome store and small Windows 8 star screen icon
            144,
            152,    // iPad touch icon
            167,    // iPad Retina touch icon
            180,    // iPhone Retina icon
            192,    // Google Developer web app recommendation
            196,    // Android home screen icon
            270,    // ieconfig
            512,
        ],
        formats: [
            "png",
        ],
        filenameFormat: function (id, src, width, format, options) {
            return `favicon-${width}.${format}`;
        }
    });

    return metadata;
}

generateFavicon("./src/favicon.png").then( r => {
    console.log(r);
});