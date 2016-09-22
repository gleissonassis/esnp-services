var logger          = require('winston');
var Promise         = require('promise');
var Subscriber      = require('./subscriber');

module.exports = () => {
    var subscriber = new Subscriber();
    return {
        notifySubscribers: (topic) => {
            return new Promise((resolve, reject) => {
                
            });
        },

        notifySubscriber: (topic, subscriber) => {
            return new Promise((resolve, reject) => {
                
            });
        }
    };
}