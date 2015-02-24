var allFiles = [
    {pattern: 'app/scripts/**/*Spec.js', included: false},
];
var baseConfig = require("./karma-base.conf.js");
var _ = require("lodash");

var fullConfig = _.clone(baseConfig, true);
fullConfig.files = fullConfig.files.concat(allFiles);

module.exports = function(config) { config.set(fullConfig); };
