'use strict';

define(['_',
        'scripts/common/configs/configApp',
        'scripts/apis/apiApp'],
    function (_) {
        return function (app) {
            app.register.factory('groupsModelSrv', ['config', 'groupsApiSrv', '$q',
                function (config, api, $q) {
                    console.log('Entering Groups Model Service');

                    var service = {};

                    return service;
                }]);
        };
    });
