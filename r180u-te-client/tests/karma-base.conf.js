// Karma base configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-08-11 using
// generator-karma 0.8.3


var baseConfig = {
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [
        {pattern: 'app/bower_components/requirejs/require.js', included: false},
        {pattern: 'app/bower_components/angular/angular.js', included: false},
        {pattern: 'app/bower_components/jquery/dist/jquery.js', included: false},
        {pattern: 'app/bower_components/bootstrap/dist/js/bootstrap.js', included: false},
        {pattern: 'app/bower_components/angular-resource/angular-resource.js', included: false},
        {pattern: 'app/bower_components/angular-cookies/angular-cookies.js', included: false},
        {pattern: 'app/bower_components/angular-sanitize/angular-sanitize.js', included: false},
        {pattern: 'app/bower_components/angular-animate/angular-animate.js', included: false},
        {pattern: 'app/bower_components/angular-touch/angular-touch.js', included: false},
        {pattern: 'app/bower_components/angular-translate/angular-translate.js', included: false},
        {
            pattern: 'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            included: false
        },
        {pattern: 'app/bower_components/angular-ui-router/release/angular-ui-router.js', included: false},
        {pattern: 'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js', included: false},
        {pattern: 'app/scripts/common/services/ui-route-extra/jtb-ct-ui-router-extras.js', included: false},
        {pattern: 'app/bower_components/angular-dynamic-locale/dist/tmhDynamicLocale.js', included: false},
        {pattern: 'app/bower_components/angular-spinner/angular-spinner.js', included: false},
        {pattern: 'app/bower_components/spin.js/spin.js', included: false},
        {pattern: 'app/bower_components/toastr/toastr.js', included: false},
        {pattern: 'app/bower_components/lodash/lodash.js', included: false},
        {pattern: 'app/bower_components/angular-mocks/angular-mocks.js', included: false},
        {pattern: 'app/bower_components/bg-splitter/js/splitter.js', included: false},

        {pattern: 'app/scripts/**/*App.js', included: false},
        {pattern: 'app/scripts/**/*Ctrl.js', included: false},
        {pattern: 'app/scripts/**/*Srv.js', included: false},
        {pattern: 'app/scripts/**/*Val.js', included: false},
        {pattern: 'app/scripts/**/*Dir.js', included: false},
        {pattern: 'app/scripts/**/*Fltr.js', included: false},
        {pattern: 'app/scripts/**/*Inc.js', included: false},

        {pattern: 'app/testfiles/*.*', included: false},

        'tests/test-main.js'
    ],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],

    preprocessors: {
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)

        'app/scripts/home/**/*App.js': ['coverage'],
        'app/scripts/**/*Ctrl.js': ['coverage'],
        'app/scripts/**/*Srv.js': ['coverage'],
        'app/scripts/**/*Val.js': ['coverage'],
        'app/scripts/**/*Dir.js': ['coverage'],
        'app/scripts/**/*Fltr.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
        type: 'html',
        dir: 'coverage/'
    },
    // list of files / patterns to exclude
    exclude: [
        'app/main.js',
        '**/*.js.map'
    ],

    // web server port
    port: 8000,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
        'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
        'karma-phantomjs-launcher',
        'karma-jasmine',
        'karma-coverage',
        'karma-requirejs',
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-ie-launcher'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    //logLevel: config.LOG_INFO

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
};
module.exports = baseConfig;
