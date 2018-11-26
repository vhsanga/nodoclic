'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV|| 'development';
var distPath = path.dirname(path.dirname(__dirname));
var srcPath = path.dirname(distPath) + "/src";

var config = require(srcPath + '/server/config/config.json')[env];
var db = {};
var directories;

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter(function (file) {
        //atando directorios desde models...
        directories = fs.readdirSync(__dirname).filter(function (file) {
            return fs.statSync(path.join(__dirname, file)).isDirectory();
        });
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        if (file == "SequelizeAttributesBase.js" || file == "SequelizeOptionsBase.js") {
            return;
        }

        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

//capturando o importando todos los modulos en sus respectivos subdirectorios...
directories.forEach(function (value, index, array) {
    fs.readdirSync(path.join(__dirname, value)).filter(function (file) {
        //importando los modulos en sus subcarpetas...
        var model = sequelize['import'](path.join(__dirname + '/' + value, file));
        db[model.name] = model;
    });
});

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
