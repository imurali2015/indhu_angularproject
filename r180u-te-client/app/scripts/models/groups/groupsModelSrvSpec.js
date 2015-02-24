'use strict';

define(['angular-mocks', 'scripts/models/modelsApp', 'scripts/models/groups/groupsModelSrv'], function (mock) {

    describe('Model: groupsModelSrv', function () {
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

        beforeEach(mock.module('modelsApp', function ($provide) {
            $provide.value('api', serviceMock);
            $provide.value('config', configMock);
            $provide.provider('$futureState', futureState);
        }));

        beforeEach(mock.inject(function ($rootScope, $controller, $injector, $httpBackend, _$translate_) {
            $q = $injector.get('$q');
            targetSrv = $injector.get('groupsModelSrv');
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
