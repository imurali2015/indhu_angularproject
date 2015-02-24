'use strict';

define(['angular', 'scripts/common/configs/configApp'], function (angular, app) {

    describe('Common ConfigApp', function () {

        var srcModule;
        var name = 'configApp';
        beforeEach(function () {
            srcModule = angular.module('configApp');
        });

        it('should be registered', function () {
            expect(srcModule).toBeDefined();
        });
        it('should be named ' + name, function () {
            expect(srcModule.name).toEqual(name);
        });

    });
});
