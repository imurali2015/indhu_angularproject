var allTestFiles = [];

var TEST_REGEXP = /spec\.js$/i;

var pathToModule = function (path) {
    return path.replace(/^\/base\//, '/base/').replace(/\.js$/, '.js');
};

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        var foo = pathToModule(file);
        allTestFiles.push(foo);
    }
});

console.log(allTestFiles);

requirejs.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/app/',

    // dynamically load all test files
    deps: allTestFiles,

    paths: {
        'angular': 'bower_components/angular/angular',
        'jquery': 'bower_components/jquery/dist/jquery',
        'json3': 'bower_components/json3/lib/json3',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        'angular-resource': 'bower_components/angular-resource/angular-resource',
        'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
        'angular-cookies': 'bower_components/angular-cookies/angular-cookies',
        'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize',
        'angular-animate': 'bower_components/angular-animate/angular-animate',
        'angular-touch': 'bower_components/angular-touch/angular-touch',
        'angular-translate': 'bower_components/angular-translate/angular-translate',
        'angular-translate-loader-static-files':
            'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
        'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
        'ct-ui-router-extras': 'scripts/common/services/ui-route-extra/jtb-ct-ui-router-extras',
        'angular-spinner': 'bower_components/angular-spinner/angular-spinner',
        'tmhDynamicLocale': 'bower_components/angular-dynamic-locale/dist/tmhDynamicLocale',
        'ui.bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'spin': 'bower_components/spin.js/spin',
        'toastr': 'bower_components/toastr/toastr',
        'lodash': 'bower_components/lodash/lodash',
        '_': 'bower_components/lodash/lodash',
        'homeApp': 'scripts/home/homeApp.js',
        'bgDirectives': 'bower_components/bg-splitter/js/splitter'
    },
    shim: {
        'angular': {'exports': 'angular'},
        'jquery': {'exports': 'jquery'},
        'json3': {'exports': 'json3'},
        'bootstrap': {'exports': 'bootstrap'},
        'ui.bootstrap': {'exports': 'bootstrap', 'deps': ['angular']},
        'angular-mocks': {'exports': 'angular-mocks', 'deps': ['angular']},
        'angular-resource': {'exports': 'angular-resource', 'deps': ['angular']},
        'angular-cookies': {'exports': 'angular-cookies', 'deps': ['angular']},
        'angular-sanitize': {'exports': 'angular-sanitize', 'deps': ['angular']},
        'angular-animate': {'exports': 'angular-animate', 'deps': ['angular']},
        'angular-touch': {'exports': 'angular-touch', 'deps': ['angular']},
        'angular-translate': {'exports': 'angular-translate', 'deps': ['angular']},
        'angular-translate-loader-static-files': {'exports': 'angular-translate-loader-static-files', 'deps': ['angular-translate']},
        'angular-ui-router': {'exports': 'angular-ui-router', 'deps': ['angular']},
        'ct-ui-router-extras': {'exports': 'ct-ui-router-extras', 'deps': ['angular']},
        'tmhDynamicLocale': {'exports': 'tmhDynamicLocale', 'deps': ['angular']},
        'angular-mocks': {'exports': 'angular.mock', 'deps': ['angular']},
        'angular-spinner': {'exports': 'angular-spinner', 'deps': ['angular']},
        'toastr': {'exports': 'jquery'},
        'lodash': {'exports': 'lodash'},
        'spin': {'exports': 'spin'},
        'homeApp': {'exports': 'homeApp', 'deps': ['angular']}
    },

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});

