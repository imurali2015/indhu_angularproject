'use strict';

define(['_',
        'scripts/common/configs/configApp',
        'scripts/apis/apiApp'],
    function (_) {
        return function (app) {
            app.register.factory('presentModelSrv', ['config', 'presentApiSrv', '$q',
                function (config, api, $q) {
                    console.log('Entering Present Model Service');

                    var service = {};

                    return service;
                }]);
        };
    });
