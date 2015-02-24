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
    'bgDirectives',
    'scripts/common/configs/configApp',
    'scripts/common/services/servicesApp',
    'scripts/models/modelsApp'
], function () {
    'use strict';
    angular.module('teachingApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'ct.ui.router.extras',
        'bgDirectives',
        'configApp',
        'servicesApp',
        'modelsApp'
    ]);

    angular.module('teachingApp')
        .config(['$futureStateProvider', '$controllerProvider', '$compileProvider', '$filterProvider',
                    '$provide', 'routeResolverProvider', '$translateProvider',
            function ($futureStateProvider, $controllerProvider, $compileProvider, $filterProvider,
                      $provide, routeResolverProvider, $translateProvider) {
                var app = angular.module('teachingApp');

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
                    return $http.get('scripts/teaching/teachingRoutes.json').then(function (resp) {
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

    angular.module('teachingApp')
        .run(function ($rootScope, $state, $window, $timeout, config, $q, $futureState, $translate) {

            config.lang = window.navigator.language.toLowerCase() || 'en-us';
            $translate.use(config.lang);

            $rootScope.$state = $state;
            $rootScope.$on('$stateChangeSuccess', function () {
            });
        });

    angular.module('teachingApp').directive('nodeList', function($compile) {
            return {
                restrict: 'E',
                terminal: true,
                scope: {
                    nodes: '=ngModel'
                },
                link: function ($scope, $element, $attrs) {
                    if (angular.isArray($scope.nodes)) {
                        $element.append('<accordion close-others="true">' +
                        '<node ng-repeat="item in nodes" ng-model="item"></node></accordion>');
                    }
                    $compile($element.contents())($scope.$new());
                }
            };
        });

    angular.module('teachingApp').directive('node', function($compile) {
            return {
                restrict: 'E',
                terminal: true,
                scope: {
                    node: '=ngModel'
                },
                link: function ($scope, $element, $attrs) {
                    if (angular.isArray($scope.node.children) && $scope.node.children.length > 0) {
                        $element.append('<accordion-group><accordion-heading>{{node.name}}' +
                        '</accordion-heading><node-list ng-model="node.children"></node-list></accordion-group>');
                    } else {
                        $element.append('<accordion-group><accordion-heading>{{node.name}}</accordion-heading></accordion-group>');
                    }
                    $compile($element.contents())($scope.$new());
                }
            };
        });
});
