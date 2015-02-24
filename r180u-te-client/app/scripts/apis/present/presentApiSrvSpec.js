'use strict';

define(['angular-mocks', 'scripts/apis/apiApp', 'scripts/apis/present/presentApiSrv'], function (mock) {

    describe('Api: presentApiSrv', function () {
        var targetSrv,
            configMock = {
                lang: ''
            },
            serviceMock,
            httpConfigMock,
            $q,
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
            defer,
            window = {
                navigator: {
                    language: 'en-us'
                }
            },
            $translate;

        beforeEach(mock.module('apiApp', function ($provide) {
            $provide.value('httpSrv', serviceMock);
            $provide.value('config', configMock);
            $provide.value('httpConfig', httpConfigMock);
            $provide.provider('$futureState', futureState);
        }));

        beforeEach(mock.inject(function ($rootScope, $controller, $injector, $httpBackend, _$translate_) {
            $q = $injector.get('$q');
            targetSrv = $injector.get('presentApiSrv');
            $translate = _$translate_;

            $httpBackend.whenGET().respond(true);

            serviceMock = {
                getList: function () {
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
