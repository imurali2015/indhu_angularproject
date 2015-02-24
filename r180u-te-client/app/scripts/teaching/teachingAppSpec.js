'use strict';

define(['angular', 'scripts/teaching/teachingApp'], function (angular, app) {

    describe('Teaching App', function() {

        var srcModule;
        var name = 'teachingApp';
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
