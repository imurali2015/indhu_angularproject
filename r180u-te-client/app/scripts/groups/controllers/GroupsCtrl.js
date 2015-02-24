'use strict';
define([
    'scripts/common/configs/configApp',
    'scripts/groups/services/groupsSrv'],
    function () {
    return ['$scope', 'config', 'groupsSrv', function ($scope, config, service) {
        var model = $scope.model = {};

        console.log('Entering Groups Controller');

        model.groupsInit = false;

        var init = function () {
            model.title = 'Groups Under Construction';
            model.groupsInit = false;
        };
        init();
    }];
});
