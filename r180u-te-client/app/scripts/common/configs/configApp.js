'use strict';

define(['angular',
    './configVal'
], function (angular, config) {
    angular.module('configApp', [])
        .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                var app = angular.module('configApp');

                app.register =
                {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service,
                    provider: $provide.provider,
                    provide: $provide
                };

                config(app, location);

            }])
        .run(function ($rootScope, $window, $timeout) {
        });

});
