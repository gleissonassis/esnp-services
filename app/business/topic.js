var logger          = require('winston');
var Topics          = require('../models/topic')();
var Promise         = require('promise');

module.exports = () => {
    return {
        clearTopics: () => {
            return new Promise((resolve, reject) => {
                Topics.remove({}).exec()
                .then(() => {
                    logger.log('info', 'The topics have been deleted succesfully');
                    resolve();
                }, (erro) => {
                    logger.log('error', 'An error has occurred while deleting all subscribers', erro);
                    reject(erro);
                });
            });            
        },

        getTopics: (date, category) => {
            return new Promise((resolve, reject) => {
                logger.log('info', 'Getting topics from database');

                var filter = {};

                if(date) {
                    filter.date = {$gte: date};
                    logger.log('debug', 'A date querystring parameter was set', date);
                }

                if(category) {
                    filter.category = category;
                    logger.log('debug', 'A category querystring parameter was set', category);
                }
                Topics.find(filter)
                .sort('date')
                .exec()
                .then((items) => {
                    logger.log('info', '%d topics were returned', items.length);
                    resolve(items);
                },(erro) => {
                    logger.log('error', 'An error has ocurred while getting topics from database', erro);
                    reject(erro);
                });
            });
        },

        saveTopic: function(topic) {
            return new Promise((resolve, reject) => {
                if(topic._id){
                    logger.log('info', 'Saving a topic', topic);

                    Topics.findByIdAndUpdate(topic._id, topic).exec()
                    .then((item) => {
                        logger.log('info', 'The topic has been updated succesfully');
                        resolve({topic: item, isInserted: false});
                    }, (erro) => {
                        logger.log('error', 'An error has ocurred while updating a topic', erro);
                        reject(erro);
                    });
                } else {
                    logger.log('info', 'Saving a new topic', topic);

                    // var gcm = require('node-gcm');

                    //   var message = new gcm.Message({
                    //       data: { title: req.body.title,
                    //               message: req.body.body }
                    //   });

                    //   // Set up the sender with you API key, prepare your recipients' registration tokens. 
                    //   var sender = new gcm.Sender('');
                    //   var regTokens = ['c0vjQv5FUnc:APA91bGwoN0DWut2ZaliLdIwLPVlXgZt9j0A0Kx6nd1ucqDMsB28rJ4NdR55-hzzG0mfYIpenJGW_bESqVHJhWhgL35HufjznMsP7DdHBXeb00FsSP_4JpSVjzwYqg7Xpql8M8v7Lb5Q',
                    //   'c0vjQv5FUnc:APA91bGwoN0DWut2ZaliLdIwLPVlXgZt9j0A0Kx6nd1ucqDMsB28rJ4NdR55-hzzG0mfYIpenJGW_bESqVHJhWhgL35HufjznMsP7DdHBXeb00FsSP_4JpSVjzwYqg7Xpql8M8v7Lb5r'];

                    //   sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                    //       if(err) console.error("ASDASDAS " + err);
                    //       else 	console.log(response);
                    //   });

                    Topics.create(topic)
                    .then((item) => {
                        logger.log('info', 'The topic has been saved succesfully');
                        resolve({topic: item, isInserted: true});
                    }, (erro) => {
                        logger.log('error', 'An error has ocurred while saving a new topic', erro);
                        reject(erro);
                    });
                }
            });
        },

        getTopic: function(id) {
            return new Promise((resolve, reject) => {
                logger.log('info', 'Getting a topic by id %s', id);

                Topics.findById(id).exec()
                .then((topic) => {
                    if(!topic) {            
                        resolve(null);
                        logger.log('info', 'No topic found');
                    } else {
                        resolve(topic);
                        logger.log('warn', 'Topic was found');
                    }
                }, (erro) => {
                    logger.log('error', 'An error has occurred while geeting a topic by id %s', id, erro);
                    reject(erro);
                });
            });
        },

        deleteTopic: function(id) {
            return new Promise((resolve, reject) => {
                logger.log('info', 'Deleting the topic by id %s', id);

                Topics.remove({'_id': id}).exec()
                .then(() => {
                    logger.log('info', 'The topic has been deleted succesfully');
                    resolve();
                },(erro) => {
                    logger.log('error', 'An error has occurred while deleting a topic by id %s 1', id, erro);
                    reject(erro);
                });
            })
        }
    };
}