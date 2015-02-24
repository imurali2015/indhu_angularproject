'use strict';

define(['angular-mocks', 'testfiles/testApp'], function (mock) {

    describe('Present: Present Controller Service Test', function () {
        var targetSrv,
            configMock = {
                lang: '',
                menuEndPoint: '',
                logger: {
                    options: ''
                }
            },
            serviceMock,
            waitMock,
            $q,
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
            $provide.value('presentModelSrv', serviceMock);
            $provide.value('model', serviceMock);
            $provide.value('waitScreenSrv', waitMock);
            $provide.value('config', configMock);
            $provide.provider('$futureState', futureState);
        }));

        beforeEach(mock.inject(function ($rootScope, $controller, $injector, $httpBackend) {
            $q = $injector.get('$q');
            targetSrv = $injector.get('presentSrv');
            $httpBackend.whenGET().respond(true);

        }));

        it('Test service exist', function () {
            expect(targetSrv).toBeDefined();
        });
    });

})
;
