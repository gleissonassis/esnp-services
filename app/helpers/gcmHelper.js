var settings    = require('../../config/settings.js');
var logger      = require('winston');
var gcm         = require('node-gcm');
var Promise     = require('promise');

module.exports = function() {
    return {
        sendMessage: (token, title, message) => {
            logger.log('info', 'Starting notification', {
                token: token,
                title: title,
                message: message
            });

            return new Promise((resolve, reject) => {
                var message = new gcm.Message({
                    data: { 
                        title: title,
                        message: message
                    }
                });

                var sender = new gcm.Sender(settings.gcmKey);

                sender.send(message, { registrationTokens: [token] }, (error, response) => {
                    if(error) {
                        logger.log('error', 'An error has ocurred while send the notification to subscriber %s', token, error);
                        reject(err);
                    } else {
                        if(response.success) {
                            logger.log('info', 'The message was sent', response);
                        } else {
                            logger.log('error', 'GCM returns an error', response);
                     	    reject(response);
                        }
                    }
                });
            });
        }
    }
}