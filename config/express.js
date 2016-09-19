var express     = require('express');
var load        = require('express-load');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var logger     = require('winston');

module.exports = function() {
    var app = express();

    logger.level = 'debug';

    app.set('port', 3000);

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(morgan('dev'));
     app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      next();
    });

    load('models', {cwd:'app'})
    .then('controllers')
    .then('routes')
    .into(app);

    return app;
};

