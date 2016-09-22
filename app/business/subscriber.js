var logger          = require('winston');
var Subscribers     = require('../models/subscriber')();
var Promise         = require('promise');

module.exports = () => {
    return {
        clearSubscribers: () => {
            return new Promise((resolve, reject) => {
                Subscribers.remove({}).exec()
                .then(() => {
                    logger.log('info', 'The subscribers have been deleted succesfully');
                    resolve();
                }, (erro) => {
                    logger.log('error', 'An error has occurred while deleting all subscribers', erro);
                    reject(erro);
                });
            });            
        },

        getSubscribers: () => {
            return new Promise((resolve, reject) => {
                logger.log('info', 'Getting all subscribers');

                Subscribers.find({})
                .exec()
                .then((items) => {                
                    logger.log('info', '%d subscribers were returned', items.length);
                    resolve(items);
                }, (erro) => {
                    logger.error('error', 'A error has occurred while getting subscribers from database');
                    reject(erro);
                });
            });   
        },

        saveSubscriber: (subscriber) => {
            return new Promise((resolve, reject) => {
                logger.log('info', 'Saving subscriber');
                
                Subscribers.find({registrationId: subscriber.registrationId})
                .exec()
                .then(function(items) {
                    subscriber.latestRegistryDate = Date.now();
                    logger.log('info', '%d items were returned searching for registrationId %s', items.length, subscriber.registrationId);

                    if(items.length) {
                        console.log('info', 'A subscriber was found', items[0]);

                        Subscribers.findByIdAndUpdate(items[0]._id, subscriber).exec()
                        .then(function(item) {
                            logger.log('info', 'The subscriber has been updated succesfully');
                            resolve({subscriber: item, isInserted: false});
                        },
                        function(erro) {
                            logger.log('error', 'An error has ocurred while updating a subscriber', erro);
                            reject(erro);
                        });
                    } else {
                        console.log('info', 'A new subscriber will be saved');

                        Subscribers.create(subscriber)
                        .then(function(item) {
                            logger.log('info', 'The subscriber has been saved succesfully');
                            resolve({subscriber: item, isInserted: true});
                        },
                        function(erro) {
                            logger.log('error', 'An error has ocurred while saving a new subscriber', erro);
                             reject(erro);
                        });
                    }
                },
                function(erro) {
                    logger.log('error', 'An error has ocurred while getting a subscriber by registrationId', erro);
                    reject(erro);
                });
            });    
        }
    };
}