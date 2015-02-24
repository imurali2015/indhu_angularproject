'use strict';
define(['scripts/common/configs/configApp',
        'scripts/common/services/httpservice/httpApp'
    ],
    function () {
        return function (app) {
            app.register.factory('dashboardApiSrv', ['$q', 'config', 'httpSrv', 'httpConfig',
                function ($q, config, httpSrv, httpConfig) {
                    console.log('Entering Api: Dashboard');

                    var service = {};

                    return service;

                }]);
        };
    });
