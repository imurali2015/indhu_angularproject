'use strict';

define(['angular-mocks', 'scripts/common/configs/configApp', 'scripts/common/configs/configVal'], function (mock, app, val) {

    describe('Common ConfigVal', function () {

        var targetConfig,
            srcModule;

        beforeEach(mock.module('configApp', function ($provide) {

        }));

        beforeEach(mock.inject(function ($rootScope, $injector) {
            targetConfig = $injector.get('config');
        }));

        it('Config to be defined', function () {
            expect(targetConfig).toBeDefined();
        });

        it('logger to be defined', function () {
            expect(targetConfig.logger).toBeDefined();
        });

        it('lang to be set to en-us', function () {
            expect(targetConfig.lang).toEqual('en-us');
        });

        it('menuEndPoint to be defined', function () {
            expect(targetConfig.menuEndPoint).toBeDefined();
        });
    });
});
