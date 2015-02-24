define([], function () {
    return function (app) {
        app.register.provider('routeResolver', ['$futureStateProvider',
            function ($futureState) {
                'use strict';
                this.$get = function () {
                    return this;
                };

                this.route = (function () {

                    var requireCtrl = function ($q, futureStates) {
                        var defer = $q.defer(),
                            statePromises = assembleStates($q, futureStates);
                        $q.all(statePromises)
                            .then(function (states) {
                                defer.resolve(states.reverse());
                            }, function (error) {
                                defer.reject(error);
                            });
                        return defer.promise;
                    };

                    var copyState = function (futureState) {
                        return {
                            'abstract': futureState.abstract || false,
                            'name': futureState.stateName,
                            'url': futureState.url,
                            'data': futureState.data || {}

                        };
                    };

                    var assembleStates = function ($q, futureStates) {
                        var states = [];
                        for (var i = 0, max = futureStates.length; i < max; i++) {
                            var futureState = futureStates[i];

                            if (futureState.views) {
                                states.push(assembleViews($q, futureState));
                            } else {
                                if (futureState.controller) {
                                    states.push(assembleView($q, futureState));
                                } else {
                                    states.push(function ($q, futureState) {
                                        var defer = $q.defer();

                                        var stateData = copyState(futureState);
                                        stateData['templateUrl'] = futureState.templateUrl;

                                        defer.resolve(stateData);

                                        return defer.promise;
                                    });
                                }
                            }
                        }
                        return states;
                    };

                    var assembleViews = function ($q, futureState) {
                        var defer = $q.defer(),
                            state = {};
                        if (futureState.views) {
                            var ctrl = [];
                            for (var view in futureState.views) {
                                if (futureState.views.hasOwnProperty(view)) {
                                    if (futureState.views[view].controller) {
                                        ctrl.push(futureState.views[view].controller);
                                    }
                                }
                            }
                            require(ctrl, function () {
                                state['abstract'] = futureState.abstract || false;
                                state['name'] = futureState.stateName;
                                state['url'] = futureState.url;
                                state['data'] = futureState.data || {};
                                state['views'] = {};
                                angular.copy(futureState.views, state['views']);
                                var keys = Object.keys(futureState.views);

                                for (var i = 0, j = arguments.length; i < j; i++) {
                                    state.views[keys[i]].controller = arguments[i];
                                }
                                defer.resolve(state);
                            });
                        }
                        return defer.promise;
                    };

                    var assembleView = function ($q, futureState) {
                        var defer = $q.defer();

                        require([futureState.controller], function (ctrl) {
                            var state = {
                                controller: ctrl,
                                name: futureState.stateName,
                                abstract: futureState.abstract || false,
                                data: futureState.data || {},
                                ur: futureState.url,
                                templateUrl: futureState.templateUrl
                            };
                            // Resolve the promise with the full UI-Router state.
                            defer.resolve(state);
                        });
                        return defer.promise;
                    };
                    return {
                        requireCtrl: requireCtrl
                    };
                }($futureState));
            }]);
    };
});
