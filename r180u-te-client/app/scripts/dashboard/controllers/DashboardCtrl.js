'use strict';
define([
    'scripts/common/configs/configApp',
    'scripts/dashboard/services/dashboardSrv'],
    function () {
    return ['$scope', 'config', 'dashboardSrv', function ($scope, config, service) {
        var model = $scope.model = {};

        console.log('Entering Dashboard Controller');

        model.dashBoardInit = false;

        var init = function () {
            model.title = 'Dashboard Under Construction';
            model.dashBoardInit = true;
        };
        init();
    }];
});
