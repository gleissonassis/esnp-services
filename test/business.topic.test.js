var chai                = require('chai');
var expect              = chai.expect;
var config              = require('./config');
var utils               = require('./test-utils');
var topic               = require('../app/business/topic')();

describe('business > topic', () => {
    before((done) => {
        topic.clearTopics().then(() => {
            done()
        }, done);
    });

    after((done) => {
        topic.clearTopics().then(() => {
            done()
        }, done);
    });

    describe('basic operations', () => {
        var newTopic = {
            title: 'Teste de tópico',
            thumbUrl: '/url',
            category: 'TD',
            date: new Date(2016, 09, 16)                    
        };
        var storedTopic = null;
        
        it('should store a new topic', (done) => {
            topic.saveTopic(newTopic).then((r) => {
                utils(() => {
                    storedTopic = r.topic;
                    expect(r.isInserted).to.be.true;
                }, done);
            }, done);  
        });

        it('should return a specifc topic', (done) => {
            topic.getTopic(storedTopic._id).then((r) => {
                utils( ()=> {
                    expect(storedTopic._id.toString()).to.equal(r._id.toString());
                    expect(storedTopic.title).to.equal(r.title);
                    expect(storedTopic.thumbUrl).to.equal(r.thumbUrl);
                    expect(storedTopic.category).to.equal(r.category);
                }, done);
            }, done);
        });

        it('should return 404 to a not existing topic', (done) => {
            topic.getTopic(null).then((r) => {
                utils(() => {
                    expect(r).to.be.null;
                }, done);
            }, done);
        });

        it('should return a list of topics', (done) => {
            topic.getTopics().then((r) => {
                utils(() => {
                    expect(r).to.have.lengthOf(1);
                }, done);
            }, done);
        });
        
        it('should return a list of topics using date param', (done) => {
            topic.getTopics(new Date(2016, 09, 16)).then((r) => {
                utils(() => {
                    expect(r).to.have.lengthOf(1);
                }, done);
            }, done);
        });

         it('should return a empty list of topics using category param with a non existing category', (done) => {
            topic.getTopics(null, 'UNDEFINED').then((r) => {
                utils(() => {
                    expect(r).to.have.lengthOf(0);
                }, done);
            }, done);
        });

        it('should return a list of topics using category param with a existing category', (done) => {
             topic.getTopics(null, 'TD').then((r) => {
                utils(() => {
                    expect(r).to.have.lengthOf(1);
                }, done);
            }, done);
        });

        it('should update a topic', (done) => {
            topic.saveTopic(storedTopic).then((r) => {
                utils(() => {
                    expect(r.isInserted).to.be.false;
                }, done);
            }, done);  
        });

        it('should delete a topic', (done) => {
            topic.deleteTopic(storedTopic._id).then(done, done);
        });
    });
});