var logger          = require('winston');
var Promise         = require('promise');
var subscriber      = require('./subscriber');

module.exports = function(gcmHelper, subscriber) {
    return {
        notifySubscriber: function(topic, subscriberInfo) {
            return new Promise((resolve, reject) => {
                logger.log('info', 'Notifying a subscriber about a topic', topic, subscriberInfo);

                gcmHelper.sendMessage(subscriberInfo.registrationId, topic.title, topic.body).then((r) => {
                    resolve(r);
                    logger.log('info', 'The message has been sent successfuly', r);
                }, (error) => {
                    logger.log('info', 'An error has ocurrend while sending messages, the subscriber will be removed from the list', error);
                    subscriber.deleteSubscriber(subscriberInfo._id).then(() => {
                        logger.log('info', 'The subscriver was deleted successfully after a error from GCM', error);
                        reject(error)
                    }, (e) => {
                        logger.log('info', 'An error has occured while deleting a subscriber after a error from GCM', error, e);
                        reject(error);
                    });
                });
            });
        },

        notifySubscribers: function(topic, subscribers) {
            var _this = this;

            var r = {
                successCount: 0,
                failureCount: 0
            };

            return new Promise((resolve, reject) => {
                logger.log('info', 'Notifying a group of subscribers about a topic', topic, subscribers);

                var promises = [];

                for(var i = 0; i < subscribers.length; i++) {
                    promises.push(_this.notifySubscriber(topic, subscribers[i]).then(() => {
                        r.successCount++;
                    }, (error) => {
                        r.failureCount++;
                    }));
                }

                Promise.all(promises).then(() => {
                    resolve(r);
                    logger.log('info', 'All promises has been executed', r);
                }, (error) => {
                    logger.log('error', 'An error has ocurrend while running promises', error, r);
                    reject(error);
                })
            });
        }
    };
}