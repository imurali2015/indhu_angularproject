'use strict';

define([
        'angular',
        'scripts/common/services/httpservice/httpApp',
        'scripts/home/homeApp',
        'scripts/common/configs/configApp'
    ],
    function (angular) {
        var app;
        try {
            app = angular.module('testApp');
        } catch (err) {
            app = angular.module('homeApp');
        }
        app = app.register || app;

        app.factory('footerSrv', ['config', function (config) {
            console.log('Entering Home Page Footer Service');

            var service = {};

            return service;

        }]);
    });
