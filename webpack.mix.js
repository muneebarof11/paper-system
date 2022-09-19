const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .react('resources/js/v1/publishers/index', 'public/jsx/publishers.js')
    .react('resources/js/v1/publishers/pIndex', 'public/jsx/ppublishers.js')
    .react('resources/js/v1/levels/index', 'public/jsx/classes.js')
    .react('resources/js/v1/levels/pIndex', 'public/jsx/pclasses.js')
    .react('resources/js/v1/subjects/index', 'public/jsx/subjects.js')
    .react('resources/js/v1/subjects/pIndex', 'public/jsx/psubjects.js')
    .react('resources/js/v1/sections/index', 'public/jsx/sections.js')
    .react('resources/js/v1/sections/pIndex', 'public/jsx/psections.js')
    .react('resources/js/v1/Questions/index', 'public/jsx/questions.js')
    .react('resources/js/v1/Questions/pIndex', 'public/jsx/pquestions.js')
    .react('resources/js/v1/Paper/index', 'public/jsx/preview.js')
    .react('resources/js/v1/saved-papers/saved-papers', 'public/jsx/saved-papers.js')

    // .react([
    //     'resources/js/v1/publishers/components/SSR_PPublishers.jsx'
    // ], 'public/js/SSR.js')
    .sourceMaps();

// mix.sass('node_modules/bootstrap/scss/bootstrap.scss', 'public/css/');
// mix.sass('resources/sass/app.scss', 'public/css');

