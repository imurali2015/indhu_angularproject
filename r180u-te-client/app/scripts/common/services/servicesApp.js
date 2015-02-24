'use strict';

define([
    'scripts/common/configs/configApp',
    './routeResolverApp',
    './httpservice/httpApp',
    'ct-ui-router-extras'
], function (configApp, routeResolverApp) {
    angular.module('servicesApp', [
        'httpApp',
        'configApp',
        'ct.ui.router.extras',
    ]);

    angular.module('servicesApp')
        .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                var app = angular.module('servicesApp');

                app.register =
                {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service,
                    provider: $provide.provider
                };

                routeResolverApp(app);
            }]);

    angular.module('servicesApp')
        .run(function ($rootScope, $state, $window, $timeout) {

        });

});
