module.exports = function () {
    var app = './app/';
    var scripts = app + 'scripts/';
    var temp = './.tmp/';
    var server = './app/simulator/';
    var report = './report/';

    var config = {
        source: '',
        temp: temp,
        scripts: scripts,
        vendor: app + 'vendor/',
        style: app + 'styles/',
        styleCss: app + 'styles/css/',
        styleLess: app + 'styles/less/styles.less',
        build: './build/',   // dist folder
        fonts: './bower_components/fontawesome/fonts/**/*.*',
        images: app + 'images/**/*.*',
        getWiredepDefaultOptions: '',
        index: app + 'index.html',
        main: [
            app + 'main.js'
        ],
        app: app,
        js: [
            app + '**/*.App.js',
            app + '**/*Ctrl.js',
            app + '**/*Srv.js',
            app + '**/*Fltr.js',
            app + '**/*Dir.js',
            app + '**/*Val.js',
            '!' + app + '**/*Spec.js'
        ],
        browserReloadDelay: 1000,
         // all my js files
        alljs: [
            scripts + '**/*.js',
            app + 'main.js',
            '!' + scripts + 'common/services/ui-route-extra/jtb-ct-ui-router-extras.js'
        ],
        bower: {
            json: require('./bower.json'),
            directory: app + 'bower_components/',
            ignorePath: '../..'
        },

        plato: {js: scripts + '**/*.js'},
        report: report,

        defaultPort: 7203,
        nodeServer: './app/simulator/app.js',
        server: ''
    };

    config.getWiredepDefaultOptions = function () {
        return {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
    };

    return config;
};
