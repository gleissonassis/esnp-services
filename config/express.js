var express     = require('express');
var load        = require('express-load');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var logger      = require('winston');
var appSettings = require('./settings');
var jwtHelper   = require('../app/helpers/jwtHelper')();

module.exports = function() {
    var app = express();

    app.requireLogin = (req, res, next) => {
        var token = req.headers['x-access-token'];
        jwtHelper.verify(token, (error, decoded) => {
            if(!error) {
                next();
            } else {
                res.status(403).json({});
            }
        });
    }

    logger.level = 'debug';

    app.set('port', appSettings.servicePort);

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(morgan('dev'));
    
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        next();
    });

    load('controllers', {cwd:'app'})
    .then('routes')
    .into(app);

    return app;
};