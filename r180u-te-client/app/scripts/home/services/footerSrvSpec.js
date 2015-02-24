'use strict';

define(['angular-mocks', 'testfiles/testApp'], function (mock) {

    describe('Home: Footer Controller Service Test', function () {
        var targetSrv,
            configMock = {
                lang: '',
                logger: {
                    options: ''
                }
            },
            serviceMock,
            tstCtrl,
            $q,
            controller,
            futureState = {
                $get: function () {
                    return this;
                },
                addResolve: function (arg) {
                },
                stateFactory: function () {
                    var a,
                        b;
                }
            },
            defer;

        beforeEach(mock.module('testApp', function ($provide) {
            $provide.value('httpSrv', serviceMock);
            $provide.value('config', configMock);
            $provide.provider('$futureState', futureState);
        }));

        beforeEach(mock.inject(function ($rootScope, $controller, $injector, $httpBackend) {
            $q = $injector.get('$q');
            targetSrv = $injector.get('footerSrv');
            $httpBackend.whenGET().respond(true);

            serviceMock = {
                callAPI: function () {
                    defer = $q.defer();

                    return defer.promise;
                }
            };
        }));

        it('Test service exist', function () {
            expect(targetSrv).toBeDefined();
        });

    });

});
