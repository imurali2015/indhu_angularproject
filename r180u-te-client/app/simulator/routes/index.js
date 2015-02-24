module.exports = function(app) {
    var api = '/api';
    var data = '/../../data/seeds/';
    var jsonfileservice = require('./utils/jsonfileservice')();

    app.get(api + '/toolbar', getToolbar);
    app.get(api + '/teacher', getTeacher);

    function getToolbar(req, res, next) {
        var toolbar = jsonfileservice.getJsonFromFile(data + 'toolbar.json');

        res.send(toolbar);
    }

    function getTeacher(req, res, next) {
        var teacher = jsonfileservice.getJsonFromFile(data + 'teacher.json');

        res.send(teacher);
    }
};
