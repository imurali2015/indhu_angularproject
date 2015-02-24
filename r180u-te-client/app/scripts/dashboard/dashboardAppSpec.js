'use strict';

define(['angular', 'scripts/dashboard/dashboardApp'], function (angular, app) {

    describe('Dashboard App', function() {

        var srcModule;
        var name = 'dashboardApp';
        beforeEach(function() {
            srcModule = angular.module(name);
        });

        it('should be registered', function() {
            expect(srcModule).toBeDefined();
        });
        it('should be named ' + name, function() {
            expect(srcModule.name).toEqual(name);
        });
    });
});
