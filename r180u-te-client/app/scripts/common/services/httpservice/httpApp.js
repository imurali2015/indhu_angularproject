define(['angular',
    'angular-spinner',
    'scripts/common/configs/configApp',
    './httpConfigVal',
    './httpSrv',
    './waitScreenSrv',
    'angular-cookies'
], function (angular, spinner, configApp, httpConfig, httpSrv, waitScreenSrv) {
    'use strict';
    angular.module('httpApp', ['ngCookies', 'angularSpinner', 'configApp']);

    angular.module('httpApp')
        .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$httpProvider', '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $httpProvider, $provide) {
                var app = angular.module('httpApp');

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

                httpConfig(app);
                httpSrv(app);
                waitScreenSrv(app);

                //initialize get if not there so its cached
                if (!$httpProvider.defaults.headers.get) {
                    $httpProvider.defaults.headers.get = {};
                }
                //disable IE ajax request caching
                $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

                $provide.factory('authIntercept', ['$q',
                    'waitScreenSrv',
                    '$window',
                    function ($q, waitScreenSrv) {
                        return {
                            'request': function (request) {
                                return request;
                            },
                            'response': function (response) {
                                return response || $q.when(response);
                            },
                            'responseError': function (rejection) {
                                if (rejection.status === 403) {
                                    console.log('403 - denied!');
                                    //alert("access denied");
                                } else if (rejection.status === 401) {
                                    console.log('401 - not authorized!');
                                } else {
                                    console.log('httpinterceptor-error:: ' + rejection.status + ', Message: ' + rejection.statusText);
                                }
                                //alert('logging out from intercept::' + rejection.status);
                                //$('#logoutForm').submit();
                                return $q.reject(rejection);
                            },
                            'requestError': function (rejection) {
                                return $q.reject(rejection);
                            }
                        };
                    }]);

                $httpProvider.interceptors.push('authIntercept');
            }]);

    angular.module('httpApp')
        .run(function ($rootScope, $window, $timeout, httpConfig, $q) {
        });
});
