define(['toastr', 'jquery'],
    function (_msgHandler_, $) {
        'use strict';
        var services = {};

        services.msgHandler = _msgHandler_;

        var msgOptions = {
            'closeButton': true,
            'debug': false,
            'positionClass': 'toast-top-full-width',
            'onclick': null,
            'showDuration': '300',
            'hideDuration': '1000',
            'timeOut': '-1',
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut',
            'target': '#messageBar'
        };

        services.msgHandler.options = msgOptions;

        var callback,
            options;

        var setArgs = function (arg1, arg2) {
            var _onHidden_ = function () {
                if (callback) {
                    callback();
                }
            };

            if (arg1) {
                if (typeof arg1 === 'function') {
                    callback = arg1;
                    options = $.extend({}, arg2 ? arg2 : {}, {onHidden: _onHidden_}, msgOptions);
                }

                if (typeof arg1 === 'object') {
                    options = $.extend({}, arg1, msgOptions);
                    callback = undefined;
                }
            } else {
                callback = undefined;
                options = $.extend({}, msgOptions);

            }

            services.msgHandler.options = options;
        };
        services.info = function (msg, arg1, arg2) {
            setArgs(arg1, arg2);
            services.msgHandler.info(msg);
        };
        services.success = function (msg, arg1, arg2) {
            setArgs(arg1, arg2);
            services.msgHandler.success(msg);
        };
        services.warning = function (msg, arg1, arg2) {
            setArgs(arg1, arg2);
            services.msgHandler.warning(msg);
        };
        services.error = function (msg, arg1, arg2) {
            setArgs(arg1, arg2);
            services.msgHandler.error(msg);
        };
        services.clear = function () {
            services.msgHandler.clear();
        };
        return services;
    });
