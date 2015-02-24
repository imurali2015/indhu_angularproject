'use strict';
define(['scripts/common/configs/configApp',
        'scripts/common/services/httpservice/httpApp'
    ],
    function () {
        return function (app) {
            app.register.factory('groupsApiSrv', ['$q', 'config', 'httpSrv', 'httpConfig',
                function ($q, config, httpSrv, httpConfig) {
                    console.log('Entering Api: Groups');

                    var service = {};

                    return service;

                }]);
        };
    });
