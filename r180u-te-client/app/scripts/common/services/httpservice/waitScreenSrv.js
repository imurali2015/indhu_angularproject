define(['angular-spinner'],
    function () {
        'use strict';
        return function (app) {
            app.register.factory('waitScreenSrv', ['usSpinnerService', function (usSpinnerService) {
                var waitScreenSrv = {};
                var count = 0;
                waitScreenSrv.toggleActivity = function (show) {
                    if (show) {
                        count += 1;
                        usSpinnerService.spin('main-spinner');
                    } else {
                        count -= 1;
                        if (count === 0) {
                            usSpinnerService.stop('main-spinner');
                        }
                    }
                };

                return waitScreenSrv;

            }]);
        };
    });
