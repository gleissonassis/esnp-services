var mongoose = require('mongoose');

module.exports = function(uri){
  mongoose.connect(uri);

  mongoose.set('debug', true);

  mongoose.connection.on('connected', function() {
    console.log('Mongoose! Connected at ' + uri);
  });

  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose! Disconnected em ' + uri);
  });

  mongoose.connection.on('error', function(erro) {
    console.log('Mongoose! Error : ' + erro);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose! Disconnected by the application');
      process.exit(0);
    });
  });
}
