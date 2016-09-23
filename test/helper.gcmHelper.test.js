var chai                = require('chai');
var expect              = chai.expect;
var config              = require('./config');
var utils               = require('./test-utils');
var Notifier            = require('../app/business/notifier');
var sinon               = require('sinon');
var GMCHelper           = require('../app/helpers/gcmHelper');

describe('helpers > gcmNotifier', () => {
    describe('sendMessage', () => {
        it('should fail', (done) => {
            var gcmHelper = new GMCHelper();
            gcmHelper.sendMessage('INVALID_TOKEN', 'TITLE', 'BODY').then(done, (error) =>{
                utils(() => {
                    expect(error.failure).to.be.equal(1);
                }, done);
            });
        });
    });
});