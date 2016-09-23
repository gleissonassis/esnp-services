var jwt     = require('jsonwebtoken');
var logger  = require('winston'); 
var settings = require('../../config/settings');

module.exports = function() {
  var controller = {};

  var secretKey = settings.jwtKey;

  logger.log('info', 'Starting JWT Helper');

  controller.verify = function(token, cb) {
    logger.log('info', 'Validating the token', token);

    jwt.verify(token, secretKey, function(err, decoded) {
      if(err) {
        logger.log('warn', 'The token is invalid', token);
      } else {
        logger.log('info', 'The token is valid', {token: token, decoded: decoded});
      }

      cb(err, decoded);
    });    
  };

  controller.createToken = function(userInfo) {
    try {
      logger.log('info', 'Creating a new JWT', userInfo);

      var r =  jwt.sign(userInfo, secretKey, {
        expiresIn: 60 * 60
      });

      logger.log('info', 'JWT has been created successfully', r);

      return r;
    } catch (err) {
      logger.log('error', 'An error has occured while creating a new JWT', err);

      throw err;
    }
  };

  logger.log('info', 'JWT Helper has been started successfully');

  return controller;
}
