define(function () {
    'use strict';
    return function (app) {
        app.register.factory('httpSrv', ['$http',
            '$q',
            '$cookies',
            '$timeout',
            'httpConfig',
            function ($http, $q, $cookies, $timeout, httpConfig) {
                var service = {},
                    log = [];
                var domain = location.hostname;
                var port = location.port;
                if (port !== undefined && port !== '80' && port !== '') {
                    port = ':' + port;
                }
                var root = '';

                service.callAPI = function (type, url, params, header) {
                    log.push(new Date() + '::callAPI - ' +
                    (type || 'get') +
                    '::' + url + '::' +
                    (params ? JSON.stringify(params) : ''));
                    return _callAPI(type, url, params, header);
                };

                var _callAPI = function (type, url, params, header) {
                    if (type && type.toUpperCase() === 'FILE') {
                        type = 'GET';
                    } else {
                        url = root + url;
                    }

                    var deferred = $q.defer();
                    //                blockUI.start();
                    var requestObj = manageRequest(type, url, params, header);

                    $timeout(function () {
                        var retObj = {
                            status: status,
                            errorData: 'Timed Out',
                            httpMethod: requestObj.type,
                            timedout: true,
                            pageloc: 1
                        };
                        deferred.reject(retObj);
                    }, httpConfig.httpTimeout);

                    $http(requestObj).success(function (data, status, headers, config) {
                        console.log('success:', arguments);

                        deferred.resolve(data);

                    }).error(function (data, status, headers, config) {
                        var retObj = {
                            status: status,
                            errorData: data,
                            httpMethod: requestObj.type,
                            timedout: true,
                            pageloc: 1
                        };

                        console.log('error:', arguments);
                        //                            blockUI.stop();
                        deferred.reject(retObj);
                    });

                    var promise = deferred.promise;

                    promise.cancel = function (reason) {
                        //                    blockUI.stop();
                        var retObj = {
                            status: reason || 'cancelled',
                            errorData: '',
                            httpMethod: requestObj.type,
                            timedout: false,
                            pageloc: 1
                        };
                        deferred.reject(retObj);
                    };

                    return promise;
                };

                function manageRequest(type, url, params, header) {
                    var requestObj = {
                        url: url,
                        method: type,
                        header: header || {}
                    };
                    switch (type && type.toUpperCase()) {
                        case 'GET':
                        case 'FILE':
                            requestObj.cache = httpConfig.cache[url] || false;
                            break;
                        case 'POST':
                        case 'PUT':
                            requestObj.header['Content-Type'] = 'application/json';
                            requestObj.data =
                                (typeof params === 'object') ? JSON.stringify(params) : params;
                            break;
                        default:
                            console.log('Invalid Type Request ' + type);
                            break;
                    }

                    return requestObj;
                }

                service.getLog = function () {
                    return log;
                };

                return service;
            }]);
    };
});
