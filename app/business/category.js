var logger          = require('winston');
var Topics          = require('../models/topic')();
var Promise         = require('promise');

module.exports = () => {
    return {
        getCategories: () => {
            return new Promise((resolve, reject) => {
                logger.log('info', 'Getting categories from database');

                Topics.find()
                .distinct('category', (error, items) => {
                    if(error) {
                        logger.log('error', 'An error has occurred while getting categories from database', error);
                        reject(error);
                    } else {
                        items.sort();
                        logger.log('debug', '%d categories was returned', items.length);
                        resolve(items);
                    }
                });
            });
        }
    };
}