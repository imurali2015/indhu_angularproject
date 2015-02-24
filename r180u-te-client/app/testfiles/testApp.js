'use strict';

define([
     'angular'
], function () {
    angular.module('testApp', [])
        .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                var app = angular.module('testApp');

                app.register =
                {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };
            }]);
});
