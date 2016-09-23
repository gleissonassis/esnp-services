var chai                = require('chai');
var expect              = chai.expect;
var config              = require('./config');
var utils               = require('./test-utils');
var subscriber          = require('../app/business/subscriber')();

describe('business > subscriber', () => {
    before((done) => {
        subscriber.clearSubscribers().then(() => {
            done()
        },done);
    });

    after((done) => {
        subscriber.clearSubscribers().then(() => {
            done()
        },done);
    });

    describe('basic operations', () => {
        var newSubscriber = {
            registrationId: Date.now()
        };
        var storedSubscriber = null;
        
        it('should store a new subscriber', (done) => {
            subscriber.saveSubscriber(newSubscriber).then((r) => {
                utils(() => {
                    storedSubscriber = r.subscriber;
                    expect(r.isInserted).to.be.true;
                }, done);
            },done);  
        });

        it('should update a existing subscriber', (done) => {
            subscriber.saveSubscriber(newSubscriber).then((r) => {
                utils(() => {
                    expect(r.subscriber._id.toString()).to.equal(storedSubscriber._id.toString());
                    expect(r.isInserted).to.be.false;
                }, done);
            },done);  
        });

        it('should return a list of all subscribers', (done) => {
            subscriber.getSubscribers().then((items) => {
                utils(() => {
                    expect(items).to.have.lengthOf(1);
                }, done);
            },done);
        });

        it('should delete a subscribers', (done) => {
            subscriber.deleteSubscriber(storedSubscriber._id).then(done, done);
        });
    });
});