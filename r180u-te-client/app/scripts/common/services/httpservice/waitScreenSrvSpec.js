define(['angular-mocks', 'scripts/common/services/httpservice/httpApp', 'scripts/common/services/httpservice/waitScreenSrv'],
    function (mock) {
        'use strict';

        describe('Common Service: Wait Screen: waitScreenSrv Test', function () {
            var targetSrv,
                spinnerMock = {
                    spin: function (spinner) {
                        spinnerName = spinner;
                        spinnerState = true;
                    },
                    stop: function (spinner) {
                        spinnerName = spinner;
                        spinnerState = false;
                    }
                },
                spinnerName,
                spinnerState,
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
                $provide.value('usSpinnerService', spinnerMock);
                $provide.provider('$futureState', futureState);
            }));

            beforeEach(mock.inject(function (_$rootScope_, $injector, _$httpBackend_, _$timeout_, _$cookies_) {
                rootScope = _$rootScope_;
                $q = $injector.get('$q');
                targetSrv = $injector.get('waitScreenSrv');
                $timeout = _$timeout_;
                $cookies = _$cookies_;
                $httpBackend = _$httpBackend_;
            }));

            it('Test service exist', function () {
                expect(targetSrv).toBeDefined();
            });

            it('Test start spinner', function () {
                targetSrv.toggleActivity(true);

                expect(spinnerName).toEqual('main-spinner');
                expect(spinnerState).toBeTruthy();
            });

            it('Test stop spinner', function () {
                targetSrv.toggleActivity(true);
                targetSrv.toggleActivity(false);

                expect(spinnerName).toEqual('main-spinner');
                expect(spinnerState).toBeFalsy();
            });
        });
    });
