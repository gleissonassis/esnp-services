var util    = require('util');
var http    = require('http');
var app     = require('./config/express')();
              require('./config/database.js')();

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express is running on port ' + app.get('port'));
});

module.exports = server;
