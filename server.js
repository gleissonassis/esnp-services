var util    = require('util');
var mongoUrl= util.format('mongodb://esnpdb:%s/esnp-services', process.env.ESNPDB_PORT);
var http    = require('http');
var app     = require('./config/express')();
              require('./config/database.js')(mongoUrl);

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express is running on port ' + app.get('port'));
});

module.exports = server;
