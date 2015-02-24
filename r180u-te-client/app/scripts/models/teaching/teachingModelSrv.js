'use strict';

define(['_',
        'scripts/common/configs/configApp',
        'scripts/apis/apiApp'],
    function (_) {
        return function (app) {
            app.register.factory('teachingModelSrv', ['config', 'teachingApiSrv', '$q',
                function (config, api, $q) {
                    console.log('Entering Teaching Model Service');

                    var service = {};

                    service.getList = function () {
                        var defer = $q.defer();

                        $q.all([
                            api.getList()
                        ]).then(
                            function (data) {
                                service.model = data[0];

                                defer.resolve(lessonPlans(data[0]));
                            },
                            function (error) {
                                defer.reject(error);
                            }
                        );

                        return defer.promise;
                    };

                    var lessonPlans = function (data) {
                        return data;
                    };

                    return service;
                }]);
        };
    });
