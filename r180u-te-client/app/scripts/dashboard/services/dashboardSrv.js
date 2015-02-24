'use strict';

define([
        'angular',
        'scripts/common/services/httpservice/httpApp',
        'scripts/dashboard/dashboardApp',
        'scripts/common/configs/configApp',
        'scripts/models/modelsApp'
    ],
    function (angular) {
        var app;
        try {
            app = angular.module('testApp');
        } catch (err) {
            app = angular.module('homeApp');
        }
        app = app.register || app;

        app.factory('dashboardSrv', ['config', 'dashboardModelSrv', '$q', 'waitScreenSrv', function (config, model, $q, waitScreenSrv) {
            console.log('Entering Dashboard Service');

            var service = {};

            return service;

        }]);
    });
