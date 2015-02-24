'use strict';

define([
    'scripts/common/configs/configApp',
    'scripts/home/services/headerSrv',
    'scripts/common/services/servicesApp'
], function () {
    return ['$scope', 'config', 'headerSrv', '$q', 'waitScreenSrv', function ($scope, config, service, $q, waitScreenSrv) {
        var model = $scope.model = {};

        console.log('Entering Home Page Header Controller');

        model.headerPageInit = false;

        var init = function () {
            model.CompanyName = 'Scholastic';
            model.headerPageInit = true;
        };

        init();

    }];
});
