define(['angular-mocks', 'scripts/common/services/servicesApp', 'scripts/common/services/routeResolverApp'], function (mock) {

    describe('Common Services Route Resolver', function () {
        'use strict';
        var targetSrv,
            $q,
            $rootScope,
            defer,
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
            };

        beforeEach(mock.module('servicesApp', function ($provide) {
            $provide.provider('$futureState', futureState);
            $provide.provider('ui', futureState);
        }));

        beforeEach(mock.inject(function (_$rootScope_, $injector, $futureState, $state, $urlRouter) {
            $q = $injector.get('$q');
            $rootScope = _$rootScope_;
            targetSrv = $injector.get('routeResolver');
        }));

        it('Test service exist', function () {
            expect(targetSrv).toBeDefined();
        });

        it('Test function: route exists', function () {
            expect(targetSrv.route).toBeDefined();
        });

        it('Test function: requireCtrl exists', function () {
            expect(targetSrv.route.requireCtrl).toBeDefined();
        });

        it('Test function: resolve state', function () {
            var futureStates = [
                {
                    stateName: 'root.intropage',
                    type: 'requireCtrl',
                    url: '/',
                    urlPrefix: '/',
                    views: {
                        main: {
                            controller: 'testfiles/IntroPageCtrl',
                            templateUrl: 'testfiles/introPage.html'
                        }
                    }
                },
                {
                    stateName: 'root',
                    abstract: true,
                    type: 'requireCtrl',
                    url: '/root',
                    urlPrefix: '/root',
                    views: {
                        footer: {
                            controller: 'testfiles/FooterCtrl',
                            templateUrl: 'testfiles/footer.html'
                        },
                        header: {
                            controller: 'testfiles/HeaderCtrl',
                            templateUrl: 'testfiles/header.html'
                        }
                    }
                }
            ];

            targetSrv.route.requireCtrl($q, futureStates).then(function (data) {
                var foo = data;
            }, function (error) {
                var foo = error;
            });

            $rootScope.$apply();

//            expect(targetSrv.route.requireCtrl).toBeDefined();
        });

    });

});
