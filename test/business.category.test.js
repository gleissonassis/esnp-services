var chai                = require('chai');
var expect              = chai.expect;
var config              = require('./config');
var utils               = require('./test-utils');
var topic               = require('../app/business/topic')();
var category            = require('../app/business/category')();

describe('business > category', () => {
    var newTopic = {
        title: 'Teste de tópico',
        thumbUrl: '/url',
        category: 'TD',
        date: new Date(2016, 09, 16)                    
    };

    before((done) => {
        topic.clearTopics().then(() => {
            topic.saveTopic(newTopic).then(() => {
                done();
            }, done);
        }, done);
    });

    after((done) => {
        topic.clearTopics().then(() => {
            done()
        }, done);
    });

    describe('basic operations', () => {
        it('should return a list of categories', (done) => {
            category.getCategories().then((r) => {
                utils(() => {
                    expect(r).to.include.members(['TD']);
                }, done);
            }, done);  
        });
    });
});