'use strict';
define(['angular',
        'scripts/apis/teaching/teachingApiInc',
        'scripts/apis/groups/groupsApiInc',
        'scripts/apis/present/presentApiInc',
        'scripts/apis/dashboard/dashboardApiInc',
        'angular-translate',
        'angular-translate-loader-static-files',
        'tmhDynamicLocale',
        'scripts/common/configs/configApp',
        'scripts/common/services/httpservice/httpApp'
    ],
    function (angular, teaching, groups, present, dashboard) {
        angular.module('apiApp', [
            'pascalprecht.translate',
            'tmh.dynamicLocale',
            'configApp',
            'httpApp'
        ]);

        angular.module('apiApp')
            .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$translateProvider',
                function ($controllerProvider, $compileProvider, $filterProvider, $provide, $translateProvider) {
                    var app = angular.module('apiApp');

                    app.register =
                    {
                        controller: $controllerProvider.register,
                        directive: $compileProvider.directive,
                        filter: $filterProvider.register,
                        factory: $provide.factory,
                        service: $provide.service
                    };

                    $translateProvider.useStaticFilesLoader({
                        prefix: 'common/languages/locale-',
                        suffix: '.json'
                    });

                    // api registrations
                    for (var i = 0; i < teaching.length; i++) {
                        teaching[i](app);
                    }
                    for (i = 0; i < groups.length; i++) {
                        groups[i](app);
                    }
                    for (i = 0; i < present.length; i++) {
                        present[i](app);
                    }
                    for (i = 0; i < dashboard.length; i++) {
                        dashboard[i](app);
                    }

                }]);

        angular.module('apiApp')
            .run(function ($rootScope, $translate, config) {
                config.lang = navigator.language.toLowerCase() || 'en-us';
                $translate.use(config.lang);
            });
    }
);
