'use strict';

define(['angular-mocks', 'scripts/common/services/httpservice/httpApp', 'scripts/common/services/httpservice/httpConfigVal'],
    function (mock, app, val) {

        describe('Common httpConfigVal', function () {

            var targetConfig,
                srcModule;

            beforeEach(mock.module('httpApp', function ($provide) {

            }));

            beforeEach(mock.inject(function ($rootScope, $injector) {
                targetConfig = $injector.get('httpConfig');
            }));

            it('Config to be defined', function () {
                expect(targetConfig).toBeDefined();
            });

            it('httpTimeout to be defined', function () {
                expect(targetConfig.httpTimeout).toBeDefined();
            });

            it('cache to be defined', function () {
                expect(targetConfig.cache).toBeDefined();
            });

        });
    });
