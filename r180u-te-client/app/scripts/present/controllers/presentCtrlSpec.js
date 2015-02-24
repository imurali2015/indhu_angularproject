'use strict';

define(['angular-mocks', 'scripts/present/controllers/PresentCtrl', 'scripts/present/presentApp'], function (mock, targetCtrl) {

    describe('Present: Present Controller Test', function () {
        var scope,
            configMock,
            serviceMock,
            tstCtrl;

        beforeEach(mock.module('presentApp'));

        beforeEach(function () {
            serviceMock = {};
            configMock = {
                logger: {
                    options: ''
                }
            };

            module(function ($provide) {
                $provide.value('presentSrv', serviceMock);
                $provide.value('config', configMock);
            });
        });

        beforeEach(mock.inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();

            tstCtrl = $controller(targetCtrl, {'$scope': scope, 'config': configMock, 'service': serviceMock});

        }));

        it('scope model presentInit to be true', function () {
            expect(scope.model.presentInit).toBeTruthy();
        });

        it('scope model to be defined', function () {
            expect(scope.model).toBeDefined();
        });

    });

});
