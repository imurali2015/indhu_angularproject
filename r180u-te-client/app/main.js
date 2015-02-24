(function () {
    'use strict';

    require.config({
        paths: {
            'angular': 'bower_components/angular/angular',
            'jquery': 'bower_components/jquery/dist/jquery',
            'json3': 'bower_components/json3/lib/json3',
            'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
            'angular-resource': 'bower_components/angular-resource/angular-resource',
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
            'bgDirectives':'bower_components/bg-splitter/js/splitter'
        },
        shim: {
            'angular': {'exports': 'angular'},
            'json3': {'exports': 'json3'},
            'bootstrap': {'exports': 'bootstrap'},
            'angular-resource': {'exports': 'angular-resource', 'deps': ['angular']},
            'angular-cookies': {'exports': 'angular-cookies', 'deps': ['angular']},
            'angular-sanitize': {'exports': 'angular-sanitize', 'deps': ['angular']},
            'angular-animate': {'exports': 'angular-animate', 'deps': ['angular']},
            'angular-touch': {'exports': 'angular-touch', 'deps': ['angular']},
            'angular-translate': {'exports': 'angular-translate', 'deps': ['angular']},
            'angular-translate-loader-static-files': {
                'exports': 'angular-translate-loader-static-files',
                'deps': ['angular-translate']
            },
            'angular-ui-router': {'exports': 'angular-ui-router', 'deps': ['angular']},
            'ct-ui-router-extras': {'exports': 'ct-ui-router-extras', 'deps': ['angular']},
            'tmhDynamicLocale': {'exports': 'tmhDynamicLocale', 'deps': ['angular-translate']},
            'spin': {'exports': 'spin'},
            'toastr': {'exports': 'toastr', 'deps': ['jquery']},
            '_': {'exports': 'lodash'}
        }

    });

    function boot() {
        var port = window.location.port;
        if (port === '8080') {
            require.config({
                baseUrl: '/WebContent/app/'
            });
        }
        require(
            [
                'scripts/home/homeApp'
            ],
            function () {
                angular.bootstrap(document, ['homeApp']);
            });
    }

    boot();
})();
