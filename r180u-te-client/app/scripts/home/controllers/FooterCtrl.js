'use strict';
define([
    'scripts/common/configs/configApp',
    'scripts/home/services/footerSrv'], function () {
    return ['$scope', 'config', 'footerSrv', '$rootScope', function ($scope, config, service, $rootScope) {
        var model = $scope.model = {};

        console.log('Entering Home Page Footer Controller');

        model.footerPageInit = false;
        model.name = service.name;

        var init = function () {
            $scope.isCollapse = false;
            model.footerPageInit = true;
        };

        init();
    }];
});
