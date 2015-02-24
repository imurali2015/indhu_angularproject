'use strict';

define(['angular-mocks', 'scripts/apis/apiApp', 'scripts/apis/teaching/teachingApiSrv'], function (mock) {

    describe('Api: teachingApiSrv', function () {
        var targetSrv,
            configMock = {
                lang: ''
            },
            serviceMock,
            httpConfigMock = {
                url: {
                    teacher: {
                        lessonPlan: '/api/teacher'
                    }
                }
            },
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

        beforeEach(mock.module('apiApp', function ($provide) {
            $provide.value('httpSrv', serviceMock);
            $provide.value('config', configMock);
            $provide.value('httpConfig', httpConfigMock);
            $provide.provider('$futureState', futureState);
        }));

        beforeEach(mock.inject(function (_$rootScope_, $controller, $injector, $httpBackend, _$translate_) {
            $q = $injector.get('$q');
            targetSrv = $injector.get('teachingApiSrv');
            $translate = _$translate_;

            $httpBackend.whenGET().respond(true);

            serviceMock = {
                callAPI: function (type, url, params, header) {
                    defer = $q.defer();
                    defer.resolve(['A', 'B', 'C', 'D']);
                    return defer.promise;
                }
            };
            $rootScope = _$rootScope_;
        }));

        it('Test service exist', function () {
            expect(targetSrv).toBeDefined();
        });

        it('Test getList exist', function () {
            expect(targetSrv.getList).toBeDefined();
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
