'use strict';

define(['angular-mocks', 'scripts/models/modelsApp', 'scripts/models/teaching/teachingModelSrv'], function (mock) {

    describe('Model: teachingModelSrv', function () {
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
            $translate,
            $rootScope;

        beforeEach(mock.module('modelsApp', function ($provide) {
            $provide.value('teachingApiSrv', serviceMock);
            $provide.value('api', serviceMock);
            $provide.value('config', configMock);
            $provide.provider('$futureState', futureState);
        }));

        beforeEach(mock.inject(function (_$rootScope_, $controller, $injector, $httpBackend, _$translate_) {
            $q = $injector.get('$q');
            targetSrv = $injector.get('teachingModelSrv');
            $translate = _$translate_;
            $rootScope = _$rootScope_;

            $httpBackend.whenGET().respond(true);

            serviceMock = {
                getList: function () {
                    defer = $q.defer();

                    defer.resolve(['A', 'B', 'C', 'D']);

                    return defer.promise;
                }
            };
        }));

        it('Test service exist', function () {
            expect(targetSrv).toBeDefined();
        });

        it('Test getList', function () {
            var results;
            targetSrv.getList().then(function (data) {
                results = data;
            }, function (error) {
                results = error;
            });

            $rootScope.$apply();

            expect(results).toBeDefined();

            expect(results.length).toEqual(4);
        });
    });

});
