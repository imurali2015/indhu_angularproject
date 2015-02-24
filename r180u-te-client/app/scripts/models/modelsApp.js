'use strict';
define(['angular',
        'scripts/models/teaching/teachingModelInc',
        'scripts/models/groups/groupsModelInc',
        'scripts/models/present/presentModelInc',
        'scripts/models/dashboard/dashboardModelInc',
        'angular-translate',
        'angular-translate-loader-static-files',
        'tmhDynamicLocale',
        'scripts/common/configs/configApp',
        'scripts/common/services/servicesApp',
        'scripts/apis/apiApp'
    ],
    function (angular, teaching, groups, present, dashboard) {
        angular.module('modelsApp', [
            'pascalprecht.translate',
            'tmh.dynamicLocale',
            'configApp',
            'servicesApp',
            'apiApp'
        ]);

        angular.module('modelsApp')
            .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$translateProvider',
                function ($controllerProvider, $compileProvider, $filterProvider, $provide, $translateProvider) {
                    var app = angular.module('modelsApp');

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

                    // Loader
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

        angular.module('modelsApp')
            .run(function ($rootScope, $translate, config) {
                config.lang = navigator.language.toLowerCase() || 'en-us';
                $translate.use(config.lang);
            });
    }
);
