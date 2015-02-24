'use strict';

define(['scripts/common/services/loggingSrv'],
    function (msgHandler) {
    return function (app) {
        app.register.provide.value('config',
            {
                'appTitle': 'Scent Client',
                'logger': msgHandler,
                'lang': 'en-us',
                menuEndPoint: 'common/languages/localemenu-{lang}.json',
                 // Cache handler
                cache: {
                },

                // Users access control list
                userACL: {

                },

                //Default page size
                pageSize: 25

            });
    };
});
