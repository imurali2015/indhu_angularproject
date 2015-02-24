'use strict';
define(['scripts/common/configs/configApp',
        'scripts/common/services/httpservice/httpApp'
    ],
    function () {
        return function (app) {
            app.register.factory('teachingApiSrv', ['$q', 'config', 'httpSrv', 'httpConfig',
                function ($q, config, httpSrv, httpConfig) {
                    console.log('Entering Api: Teacher Lesson Plan');

                    var service = {};

                    service.getList = function () {
                        var defer = $q.defer();

                        httpSrv.callAPI('GET', httpConfig.url.teacher.lessonPlan)
                            .then(
                            function (data) {
                                defer.resolve(data);
                            },
                            // failure
                            function (error) {
                                defer.reject(error);
                            }
                        );

                        return defer.promise;
                    };

                    return service;

                }]);
        };
    });
