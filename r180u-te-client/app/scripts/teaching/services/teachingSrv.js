'use strict';

define([
        'angular',
        'scripts/common/services/httpservice/httpApp',
        'scripts/teaching/teachingApp',
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

        app.factory('teachingSrv', ['config', 'teachingModelSrv', '$q', 'waitScreenSrv', function (config, model, $q, waitScreenSrv) {
            console.log('Entering Lesson PLan Service');

            var service = {};

            service.getLessonPlan = function() {
                waitScreenSrv.toggleActivity(true);
                var defer = $q.defer();

                $q.all([
                    model.getList()
                ]).then(
                    function (data) {
                        service.model = data[0];

                        defer.resolve(service.model);
                        waitScreenSrv.toggleActivity(false);
                    },
                    function (error) {
                        defer.reject(error);
                        waitScreenSrv.toggleActivity(false);
                    }
                );

                return defer.promise;
            };

            return service;

        }]);
    });
