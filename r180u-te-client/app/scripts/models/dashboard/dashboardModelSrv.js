'use strict';

define(['_',
        'scripts/common/configs/configApp',
        'scripts/apis/apiApp'],
    function (_) {
        return function (app) {
            app.register.factory('dashboardModelSrv', ['config', 'dashboardApiSrv', '$q',
                function (config, api, $q) {
                    console.log('Entering Dashboard Model Service');

                    var service = {};

                    return service;
                }]);
        };
    });
