'use strict';

define(['angular-mocks', 'scripts/home/controllers/HeaderCtrl', 'scripts/home/homeApp'], function (mock, targetCtrl) {

    describe('Home: Header Controller Test', function () {
        var scope,
            tstCtrl,
            $q,
            serviceMock,
            waitMock,
            configMock = {
                logger: {
                    options: ''
                }
            },
            controller,
            futureState = {
                $get: function () {
                    return this;
                },
                addResolve: function (arg) {
                },
                stateFactory: function () {
                    var a, b;
                }
            },
            defer;

        beforeEach(mock.module('homeApp', function ($provide) {
            $provide.value('headerSrv', serviceMock);
            $provide.value('service', serviceMock);
            $provide.value('waitScreenSrv', waitMock);
            $provide.value('config', configMock);
            $provide.provider('$futureState', futureState);
        }));

        beforeEach(mock.inject(function ($rootScope, $controller, $injector, $httpBackend) {
            scope = $rootScope.$new();
            $q = $injector.get('$q');
            defer = $q.defer();
            $httpBackend.whenGET().respond(true);

            tstCtrl = $controller(targetCtrl, {'$scope': scope, 'config': configMock, 'service': serviceMock});
        }));

        it('scope model to be defined', function () {
            expect(scope.model).toBeDefined();
        });

        it('scope model headerPageInit to be true', function () {
            expect(scope.model.headerPageInit).toBeTruthy();
        });

    });

});
