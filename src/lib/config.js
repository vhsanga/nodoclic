'use strict';

var fs = require('fs');
var path = require('path');
var srcPath = path.dirname(path.dirname(__dirname)) + "/src";
var yaml = require('js-yaml');
var environment = require('./environment');
var config = yaml.safeLoad(fs.readFileSync(srcPath + '/config/config.yml', 'utf-8'));

module.exports = function() {
	
    return config[environment().name] || {};
};