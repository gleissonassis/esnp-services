var http    = require('http');
var app     = require('./config/express')();
              require('./config/database.js')('mongodb://localhost/esnp-services');

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express is running on port ' + app.get('port'));
});

module.exports = server;
