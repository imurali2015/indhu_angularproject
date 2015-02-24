'use strict';

define(['angular-mocks', 'scripts/home/controllers/FooterCtrl', 'scripts/home/homeApp'], function (mock, targetCtrl) {

    describe('Home: Footer Controller Test', function () {
        var scope,
            configMock,
            serviceMock,
            tstCtrl;

        beforeEach(mock.module('homeApp'));

        beforeEach(function () {
            serviceMock = {};
            configMock = {
                logger: {
                    options: ''
                }
            };

            module(function ($provide) {
                $provide.value('footerSrv', serviceMock);
                $provide.value('service', serviceMock);
                $provide.value('config', configMock);
            });
        });

        beforeEach(mock.inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();

            tstCtrl = $controller(targetCtrl, {'$scope': scope, 'config': configMock, 'service': serviceMock});

        }));

        it('scope model footerPageInit to be true', function () {
            expect(scope.model.footerPageInit).toBeTruthy();
        });

        it('scope model to be defined', function () {
            expect(scope.model).toBeDefined();
        });

    });

});
