'use strict';

define(['angular', 'scripts/groups/groupsApp'], function (angular, app) {

    describe('Groups App', function() {

        var srcModule;
        var name = 'groupsApp';
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
