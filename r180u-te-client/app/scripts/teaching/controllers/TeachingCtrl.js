'use strict';
define([
        'scripts/common/configs/configApp',
        'scripts/teaching/services/teachingSrv'],
    function () {
        return ['$scope', 'config', 'teachingSrv', function ($scope, config, service) {
            var model = $scope.model = {};

            console.log('Entering Teaching Controller');

            model.lessonPlanInit = false;

            var init = function () {
                model.title = 'TEACHING';
                service.getLessonPlan().then(
                    function (data) {
                        model.data = data;
                        model.lessonPlanInit = true;
                    },
                    function (error) {
                        $translate('teaching.errors.getList').then(function (msg) {
                            config.logger.error(msg);
                        });
                    }
                );
            };
            init();
        }];
    });
