'use strict';

define(['angular', 'scripts/present/presentApp'], function (angular, app) {

    describe('Present App', function() {

        var srcModule;
        var name = 'presentApp';
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
