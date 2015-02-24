'use strict';

define(['angular', 'scripts/common/services/servicesApp'], function (angular, app) {

    describe('Common ServicesApp', function() {

        var srcModule;
        var name = 'servicesApp';
        beforeEach(function() {
            srcModule = angular.module(name);
        });

        it('should be registered', function() {
            expect(srcModule).toBeDefined();
        });
        it('should be named ' + name, function() {
            expect(srcModule.name).toEqual(name);
        });

        describe('Dependencies:', function() {
///
//            //you can also test the module's dependencies
//
//            it('should have App.Directives as a dependency', function() {
//                expect(hasModule('App.Directives')).to.equal(true);
//            });
//
//            it('should have App.Filters as a dependency', function() {
//                expect(hasModule('App.Filters')).to.equal(true);
//            });
//
//            it('should have App.Routes as a dependency', function() {
//                expect(hasModule('App.Routes')).to.equal(true);
//            });
//
//            it('should have App.Services as a dependency', function() {
//                expect(hasModule('App.Services')).to.equal(true);
//            });
        });
    });
});
