'use strict';

define(['angular-mocks', 'scripts/common/services/httpservice/httpApp', 'scripts/common/services/httpservice/httpSrv'], function (mock) {

    describe('Common Service: httpservice: httpSrv Test', function () {
        var targetSrv,
            configMock = {
                lang: '',
                cache: [],
                httpTimeout: 30000
            },
            $q,
            $timeout,
            $cookies,
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
            defer,
            rootScope,
            $httpBackend;

        beforeEach(mock.module('httpApp', function ($provide) {
            $provide.value('httpConfig', configMock);
            $provide.provider('$futureState', futureState);
            $provide.provider('$futureState', futureState);
        }));

        beforeEach(mock.inject(function (_$rootScope_, $injector, _$httpBackend_, _$timeout_, _$cookies_) {
            rootScope = _$rootScope_;
            $q = $injector.get('$q');
            targetSrv = $injector.get('httpSrv');
            $timeout = _$timeout_;
            $cookies = _$cookies_;
            $httpBackend = _$httpBackend_;
        }));

        it('Test service exist', function () {
            expect(targetSrv).toBeDefined();
        });

        it('Test service functions callAPI exist', function () {
            expect(targetSrv.callAPI).toBeDefined();
        });

        it('Test service functions getLog exist', function () {
            expect(targetSrv.getLog).toBeDefined();
        });

        it('Test httpSrv GET', function () {
            var url = '/path/to/resource',
                mockData = 'mock data',
                responseData = '';

            $httpBackend.expectGET(url).respond(200, mockData);

            // Call http service
            var httpCall = targetSrv.callAPI('GET', '/path/to/resource').then(function (data) {
                responseData = data;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $httpBackend.flush();

            expect(responseData).toEqual(mockData);
        });

        it('Test httpSrv GET With Timeout', function () {
            var url = '/path/to/resource',
                mockData = 'mock data',
                responseData = '';

            $httpBackend.expectGET(url).respond(200, mockData);

            // Call http service
            var httpCall = targetSrv.callAPI('GET', '/path/to/resource').then(function (data) {
                responseData = data;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $timeout.flush();

            expect(responseData).toEqual('Error');
        });

        it('Test httpSrv GET With 500 Error', function () {
            var url = '/path/to/resource',
                mockData = 'mock data',
                responseData = '';

            $httpBackend.expectGET(url).respond(500, mockData);

            // Call http service
            var httpCall = targetSrv.callAPI('GET', '/path/to/resource').then(function (data) {
                responseData = data;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $httpBackend.flush();

            expect(responseData).toEqual('Error');
        });

        it('Test httpSrv FILE', function () {
            var url = '/path/to/resource',
                mockData = 'mock data',
                responseData = '';

            $httpBackend.expectGET(url).respond(200, mockData);

            // Call http service
            var httpCall = targetSrv.callAPI('FILE', '/path/to/resource').then(function (data) {
                responseData = data;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $httpBackend.flush();

            expect(responseData).toEqual(mockData);
        });

        it('Test httpSrv FILE With Timeout', function () {
            var url = '/path/to/resource',
                mockData = 'mock data',
                responseData = '';

            $httpBackend.expectGET(url).respond(200, mockData);

            // Call http service
            var httpCall = targetSrv.callAPI('FILE', '/path/to/resource').then(function (data) {
                responseData = data;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $timeout.flush();

            expect(responseData).toEqual('Error');
        });

        it('Test httpSrv FILE With 500 Error', function () {
            var url = '/path/to/resource',
                mockData = 'mock data',
                responseData = '';

            $httpBackend.expectGET(url).respond(500, mockData);

            // Call http service
            var httpCall = targetSrv.callAPI('FILE', '/path/to/resource').then(function (data) {
                responseData = data;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $httpBackend.flush();

            expect(responseData).toEqual('Error');
        });

        it('Test httpSrv GET With 403 Error', function () {
            var url = '/path/to/resource',
                mockData = 'mock data',
                responseData = '';

            $httpBackend.expectGET(url).respond(403, mockData);

            // Call http service
            var httpCall = targetSrv.callAPI('GET', '/path/to/resource').then(function (data) {
                responseData = data;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $httpBackend.flush();

            expect(responseData).toEqual('Error');
        });

        it('Test httpSrv POST', function () {
            var url = '/path/to/resource',
                successCallback = jasmine.createSpy('success'),
                errorCallback = jasmine.createSpy('error'),
                header = {'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8'},
                mockData = {'data:': 'mock data'},
                responseData = '';

            $httpBackend.expectPOST(url, mockData, function (headers) {
                // check if the header was send, if it wasn't the expectation won't
                // match the request and the test will fail
                return headers['Accept'] === 'application/json, text/plain, */*' &&
                            headers['Content-Type'] === 'application/json;charset=utf-8';
            }).respond(200, 'mockData!');

            // Call http service
            var httpCall = targetSrv.callAPI('POST', '/path/to/resource', mockData).then(function (mockData) {
                responseData = mockData;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $httpBackend.flush();

            expect(responseData).toEqual('mockData!');
        });

        it('Test httpSrv POST With Timeout', function () {
            var url = '/path/to/resource',
                successCallback = jasmine.createSpy('success'),
                errorCallback = jasmine.createSpy('error'),
                header = {'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8'},
                mockData = {'data:': 'mock data'},
                responseData = '';

            $httpBackend.expectPOST(url, mockData, function (headers) {
                // check if the header was send, if it wasn't the expectation won't
                // match the request and the test will fail
                return headers['Accept'] === 'application/json, text/plain, */*' &&
                            headers['Content-Type'] === 'application/json;charset=utf-8';
            }).respond(200, 'mockData!');

            // Call http service
            var httpCall = targetSrv.callAPI('POST', '/path/to/resource', mockData).then(function (mockData) {
                responseData = mockData;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $timeout.flush();

            expect(responseData).toEqual('Error');
        });

        it('Test httpSrv POST With 500 error', function () {
            var url = '/path/to/resource',
                successCallback = jasmine.createSpy('success'),
                errorCallback = jasmine.createSpy('error'),
                header = {'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8'},
                mockData = {'data:': 'mock data'},
                responseData = '';

            $httpBackend.expectPOST(url, mockData, function (headers) {
                // check if the header was send, if it wasn't the expectation won't
                // match the request and the test will fail
                return headers['Accept'] === 'application/json, text/plain, */*' &&
                            headers['Content-Type'] === 'application/json;charset=utf-8';
            }).respond(500, 'mockData!');

            // Call http service
            var httpCall = targetSrv.callAPI('POST', '/path/to/resource', mockData).then(function (mockData) {
                responseData = mockData;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $httpBackend.flush();

            expect(responseData).toEqual('Error');
        });

        it('Test httpSrv PUT', function () {
            var url = '/path/to/resource',
                successCallback = jasmine.createSpy('success'),
                errorCallback = jasmine.createSpy('error'),
                header = {'LWSSO': 'token value'},
                mockData = {'data:': 'mock data'},
                responseData = '';

            $httpBackend.expectPUT(url, mockData, function (headers) {
                // check if the header was send, if it wasn't the expectation won't
                // match the request and the test will fail
                return headers['Accept'] === 'application/json, text/plain, */*' &&
                            headers['Content-Type'] === 'application/json;charset=utf-8';
            }).respond(200, 'mockData!');

            // Call http service
            var httpCall = targetSrv.callAPI('PUT', '/path/to/resource', mockData).then(function (mockData) {
                responseData = mockData;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $httpBackend.flush();

            expect(responseData).toEqual('mockData!');
        });

        it('Test httpSrv PUT With Timeout', function () {
            var url = '/path/to/resource',
                successCallback = jasmine.createSpy('success'),
                errorCallback = jasmine.createSpy('error'),
                header = {'LWSSO': 'token value'},
                mockData = {'data:': 'mock data'},
                responseData = '';

            $httpBackend.expectPUT(url, mockData, function (headers) {
                // check if the header was send, if it wasn't the expectation won't
                // match the request and the test will fail
                return headers['Accept'] === 'application/json, text/plain, */*' &&
                            headers['Content-Type'] === 'application/json;charset=utf-8';
            }).respond(200, 'mockData!');

            // Call http service
            var httpCall = targetSrv.callAPI('PUT', '/path/to/resource', mockData).then(function (mockData) {
                responseData = mockData;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $timeout.flush();

            expect(responseData).toEqual('Error');
        });

        it('Test httpSrv PUT With 500 error', function () {
            var url = '/path/to/resource',
                successCallback = jasmine.createSpy('success'),
                errorCallback = jasmine.createSpy('error'),
                header = {'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8'},
                mockData = {'data:': 'mock data'},
                responseData = '';

            $httpBackend.expectPUT(url, mockData, function (headers) {
                // check if the header was send, if it wasn't the expectation won't
                // match the request and the test will fail
                return headers['Accept'] === 'application/json, text/plain, */*' &&
                            headers['Content-Type'] === 'application/json;charset=utf-8';
            }).respond(500, 'mockData!');

            // Call http service
            var httpCall = targetSrv.callAPI('PUT', '/path/to/resource', mockData).then(function (mockData) {
                responseData = mockData;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $httpBackend.flush();

            expect(responseData).toEqual('Error');
        });

        it('Test httpSrv DELETE', function () {
            var url = '/path/to/resource',
                successCallback = jasmine.createSpy('success'),
                errorCallback = jasmine.createSpy('error'),
                header = {'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8'},
                mockData = {'data:': 'mock data'},
                responseData = '';

            $httpBackend.expectDELETE(url, {'Accept': 'application/json, text/plain, */*'}, function (headers) {
                // check if the header was send, if it wasn't the expectation won't
                // match the request and the test will fail
                return headers['Accept'] === 'application/json, text/plain, */*' &&
                            headers['Content-Type'] === 'application/json;charset=utf-8';
            }).respond(200, 'mockData!');

            // Call http service
            var httpCall = targetSrv.callAPI('DELETE', '/path/to/resource', mockData).then(function (mockData) {
                responseData = mockData;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $httpBackend.flush();

            expect(responseData).toEqual('mockData!');
        });

        it('Test httpSrv DELETE with Timeout', function () {
            var url = '/path/to/resource',
                successCallback = jasmine.createSpy('success'),
                errorCallback = jasmine.createSpy('error'),
                header = {'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8'},
                mockData = {'data:': 'mock data'},
                responseData = '';

            $httpBackend.expectDELETE(url, {'Accept': 'application/json, text/plain, */*'}, function (headers) {
                // check if the header was send, if it wasn't the expectation won't
                // match the request and the test will fail
                return headers['Accept'] === 'application/json, text/plain, */*' &&
                            headers['Content-Type'] === 'application/json;charset=utf-8';
            }).respond(500, 'mockData!');

            // Call http service
            var httpCall = targetSrv.callAPI('DELETE', '/path/to/resource', mockData).then(function (mockData) {
                responseData = mockData;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $timeout.flush();

            expect(responseData).toEqual('Error');
        });

        it('Test httpSrv DELETE with 500 Error', function () {
            var url = '/path/to/resource',
                successCallback = jasmine.createSpy('success'),
                errorCallback = jasmine.createSpy('error'),
                header = {'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=utf-8'},
                mockData = {'data:': 'mock data'},
                responseData = '';

            $httpBackend.expectDELETE(url, {'Accept': 'application/json, text/plain, */*'}, function (headers) {
                // check if the header was send, if it wasn't the expectation won't
                // match the request and the test will fail
                return headers['Accept'] === 'application/json, text/plain, */*' &&
                                    headers['Content-Type'] === 'application/json;charset=utf-8';
            }).respond(500, 'mockData!');

            // Call http service
            var httpCall = targetSrv.callAPI('DELETE', '/path/to/resource', mockData).then(function (mockData) {
                responseData = mockData;
            }, function (error) {
                responseData = 'Error';
            });
            // flush response
            $httpBackend.flush();

            expect(responseData).toEqual('Error');
        });
    });
});
