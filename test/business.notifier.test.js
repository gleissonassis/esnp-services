var chai                = require('chai');
var expect              = chai.expect;
var config              = require('./config');
var utils               = require('./test-utils');
var Notifier            = require('../app/business/notifier');
var sinon               = require('sinon');
var GMCHelper           = require('../app/helpers/gcmHelper');
var Subscriber          = require('../app/business/subscriber');

describe('business > notifier', () => {
    var topic = {
        _id : 'ID',
        title: 'Teste de tópico',
        thumbUrl: '/url',
        category: 'TD',
        date: new Date(2016, 09, 16)                    
    };

    var subscriberInfo = {
        _id : 'VALID',
        registrationId : 'VALID'
    }

    var invalidSubscriberInfo = {
        _id : 'INVALID',
        registrationId : 'INVALID'
    }

    describe('notifySubcriber', () => {
        it('should notify a valid subcriber about a topic', (done) => {
            var gcmHelper = new GMCHelper();
            var subscriber = new Subscriber();

            var stubSendMessage = sinon.stub(gcmHelper, "sendMessage", (token, title, message) => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            });

            var stubDeleteSubscriber = sinon.stub(subscriber, "deleteSubscriber");

            var notifier = new Notifier(gcmHelper, subscriber);  
            notifier.notifySubscriber(topic, subscriberInfo).then((r) =>{
                utils(() => {
                    expect(stubSendMessage.called).to.be.true;
                    expect(stubDeleteSubscriber.called).to.be.false;
                }, done);
            }, done);
        });

        it('should remove a invalid subscriber', (done) => {
            var gcmHelper = new GMCHelper();
            var subscriber = new Subscriber();

            var stubSendMessage = sinon.stub(gcmHelper, "sendMessage", (token, title, message) => {
                return new Promise((resolve, reject) => {
                    reject(true);
                });
            });

            var stubDeleteSubscriber = sinon.stub(subscriber, "deleteSubscriber", (id) => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            });

            var notifier = new Notifier(gcmHelper, subscriber);  
            
            notifier.notifySubscriber(topic, subscriberInfo).then(done, (error) => {
                utils(() => {
                    expect(stubSendMessage.called).to.be.true;
                    expect(stubDeleteSubscriber.called).to.be.true;
                }, done);
            });
        });
    });

    describe('notifySubcribers', () => {
        it('should notify a group of subcribers about a topic and remove invalid subcribers', (done) => {
            var gcmHelper = new GMCHelper();
            var subscriber = new Subscriber();

            var stubSendMessage = sinon.stub(gcmHelper, "sendMessage", (token, title, message) => {
                return new Promise((resolve, reject) => {
                    if(token == invalidSubscriberInfo._id) {
                        reject(true);
                    } else {
                        resolve();
                    }
                });
            });

            var stubDeleteSubscriber = sinon.stub(subscriber, "deleteSubscriber", (id) => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            });

            var notifier = new Notifier(gcmHelper, subscriber);  
            notifier.notifySubscribers(topic, [subscriberInfo, invalidSubscriberInfo, subscriberInfo]).then((r) =>{
                utils(() => {
                    expect(r.successCount).to.be.equal(2);
                    expect(r.failureCount).to.be.equal(1);
                    expect(stubSendMessage.callCount).to.be.equal(3);
                    expect(stubDeleteSubscriber.callCount).to.be.equal(1);
                }, done);
            }, done);
        });
    });
});