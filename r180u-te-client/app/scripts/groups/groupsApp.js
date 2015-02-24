define([
    'angular',
    'angular-animate',
    'angular-cookies',
    'angular-resource',
    'angular-sanitize',
    'angular-touch',
    'angular-ui-router',
    'angular-translate',
    'angular-translate-loader-static-files',
    'tmhDynamicLocale',
    'ct-ui-router-extras',
    'scripts/common/configs/configApp',
    'scripts/common/services/servicesApp',
    'scripts/models/modelsApp'
], function () {
    'use strict';
    angular.module('groupsApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'ct.ui.router.extras',
        'configApp',
        'servicesApp',
        'modelsApp'
    ]);

    angular.module('groupsApp')
        .config(['$futureStateProvider', '$controllerProvider', '$compileProvider', '$filterProvider',
                    '$provide', 'routeResolverProvider', '$translateProvider',
            function ($futureStateProvider, $controllerProvider, $compileProvider, $filterProvider,
                      $provide, routeResolverProvider, $translateProvider) {
                var app = angular.module('groupsApp');

                app.register =
                {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };

                $translateProvider.useStaticFilesLoader({
                    prefix: 'common/languages/locale-',
                    suffix: '.json'
                });

                // Loading states from .json file during runtime
                var loadAndRegisterFutureStates = function ($http) {
                    // $http.get().then() returns a promise
                    return $http.get('scripts/groups/groupsRoutes.json').then(function (resp) {
                        angular.forEach(resp.data, function (fstate) {
                            // Register each state returned from $http.get() with $futureStateProvider
                            $futureStateProvider.futureState(fstate);
                        });
                    });
                };

                $futureStateProvider.stateFactory('requireCtrl',
                        routeResolverProvider.route.requireCtrl); // Register state factory that registers controller via eval.

                $futureStateProvider.addResolve(loadAndRegisterFutureStates);

            }]);

    angular.module('groupsApp')
        .run(function ($rootScope, $state, $window, $timeout, config, $q, $futureState, $translate) {

            config.lang = window.navigator.language.toLowerCase() || 'en-us';
            $translate.use(config.lang);

            $rootScope.$state = $state;
            $rootScope.$on('$stateChangeSuccess', function () {
            });
        });
});
