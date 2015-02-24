'use strict';

define(['angular', 'scripts/home/homeApp'], function (angular, app) {

    describe('Home App', function() {

        var srcModule;
        var name = 'homeApp';
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
