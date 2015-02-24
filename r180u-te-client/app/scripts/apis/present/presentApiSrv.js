'use strict';
define(['scripts/common/configs/configApp',
        'scripts/common/services/httpservice/httpApp'
    ],
    function () {
        return function (app) {
            app.register.factory('presentApiSrv', ['$q', 'config', 'httpSrv', 'httpConfig',
                function ($q, config, httpSrv, httpConfig) {
                    console.log('Entering Api: Present');

                    var service = {};

                    return service;

                }]);
        };
    });
