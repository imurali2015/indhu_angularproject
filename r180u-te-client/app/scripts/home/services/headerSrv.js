'use strict';

define([
        'angular',
        'scripts/common/services/httpservice/httpApp',
        'scripts/home/homeApp',
        'scripts/common/configs/configApp'
    ],
    function (angular, httpApp, configApp) {
        var app;
        try {
            app = angular.module('testApp');
        } catch (err) {
            app = angular.module('homeApp');
        }
        app = app.register || app;

        app.factory('headerSrv', ['config', function (config) {
            console.log('Entering Home Page Header Service');

            var service = {};

            return service;

        }]);
    });
