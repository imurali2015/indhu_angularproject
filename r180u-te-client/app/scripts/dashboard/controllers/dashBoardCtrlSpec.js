'use strict';

define(['angular-mocks', 'scripts/dashboard/controllers/DashboardCtrl', 'scripts/dashboard/dashboardApp'],
    function (mock, targetCtrl) {

        describe('Dashboard: Dashboard Controller Test', function () {
            var scope,
                configMock,
                serviceMock,
                tstCtrl;

            beforeEach(mock.module('dashboardApp'));

            beforeEach(function () {
                serviceMock = {};
                configMock = {
                    logger: {
                        options: ''
                    }
                };

                module(function ($provide) {
                    $provide.value('dashboardSrv', serviceMock);
                    $provide.value('config', configMock);
                });
            });

            beforeEach(mock.inject(function ($rootScope, $controller) {
                scope = $rootScope.$new();

                tstCtrl = $controller(targetCtrl, {'$scope': scope, 'config': configMock, 'service': serviceMock});

            }));

            it('scope model dashBoardInit to be true', function () {
                expect(scope.model.dashBoardInit).toBeTruthy();
            });

            it('scope model to be defined', function () {
                expect(scope.model).toBeDefined();
            });

        });

    });
