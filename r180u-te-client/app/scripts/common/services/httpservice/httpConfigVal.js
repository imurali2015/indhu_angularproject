define(function () {
    return function (app) {
        app.register.provide.value('httpConfig',
            {
                // Cache handler
                cache: {
                },
                url: {
                    teacher: {
                        lessonPlan: '/api/teacher'
                    }
                },
                httpTimeout: 30000,
                port: 7203
            });
    };
});
