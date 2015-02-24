'use strict';

define([
        'angular',
        'scripts/common/services/httpservice/httpApp',
        'scripts/groups/groupsApp',
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

        app.factory('groupsSrv', ['config', 'groupsModelSrv', '$q', 'waitScreenSrv', function (config, model, $q, waitScreenSrv) {
            console.log('Entering Groups Service');

            var service = {};

            return service;

        }]);
    });
