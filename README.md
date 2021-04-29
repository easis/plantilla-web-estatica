# plantilla-web-estatica
Plantilla para generar páginas web estáticas usando Node y [11ty](https://www.11ty.dev/) (eleventy).

El objetivo es crear un proyecto genérico, configurable y extensible que pueda servir de base para la generación de páginas estáticas simples como portfolios, landing pages o páginas personales.

<details>
    <summary>Características</summary>

- [x] Generación de páginas estáticas
- [x] Servidor web local para el desarollo ([BrowserSync](https://browsersync.io/))
  - [x] Hot reload
  - [x] HTTPS & HTTP/2 
- [ ] Compilación y minificación de recursos (css y js)
- [ ] Optimización de imágenes
  - [ ] Uso de elementos `<picture>` con `<img srcset="..">` 
  - [ ] Conversión a [WebP](https://developers.google.com/speed/webp)
  - [ ] Generación de _favicons_ para diferentes plataforams
- [ ] Metaetiquetas para SEO
  - [x] Clásicas (descripción, keywords, etc)
  - [x] [OpenGraph](https://ogp.me/)
  - [x] [Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)
  - [ ] [Structured data](https://developers.google.com/search/docs/guides/intro-structured-data)
- [ ] [Web Manifest](https://developer.mozilla.org/es/docs/Web/Manifest) y [PWA](https://web.dev/progressive-web-apps/)
- [ ] Analíticas sin cookies (para que no salga el dichoso cartelito)
- [ ] CI/CD con [Lighthouse](https://developers.google.com/web/tools/lighthouse?hl=es) para medir el rendimiento de tu página antes de subir a producción
- [ ] Deploy automático mediante [GitHub Actions](https://github.com/features/actions)
</details>

<details>
    <summary>Requisitos</summary>

- [Node](https://nodejs.org/es/) (_verisón mínima: 14_)
- Un editor de código chulo y extendible como [Visual Studio Code](https://code.visualstudio.com/)
</details>

<details>
    <summary>Instalación</summary>

Descarga la plantilla:

`git clone https://github.com/easis/plantilla-web-estatica/`

Puedes añadir el nombre de la carpeta donde quieres guardar el proyecto al final del comando:

`git clone https://github.com/easis/plantilla-web-estatica/ nombre-proyecto`

>También puedes descargar el proyecto en formato zip desde [este enlace](https://github.com/easis/plantilla-web-estatica/archive/refs/heads/main.zip).

Dentro de la carpeta del proyecto, ejecuta el siguiente comando en la terminal:

`npm install`

Esto lo que hace es instalar todas las dependencias necesarias
</details>