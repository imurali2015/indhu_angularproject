'use strict';
define([
    'scripts/common/configs/configApp',
    'scripts/present/services/presentSrv'],
    function () {
    return ['$scope', 'config', 'presentSrv', function ($scope, config, service) {
        var model = $scope.model = {};

        console.log('Entering Present Controller');

        model.presentInit = false;

        var init = function () {
            model.title = 'Present Under Construction';
            model.presentInit = true;
        };
        init();
    }];
});
