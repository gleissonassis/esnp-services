var assert      = require('assert');
var config      = require('../config/settings');
var adHelper    = require('../app/helpers/adHelper')();

describe('ad-helper', function() {
    describe('auth', function() {
        it('should authenticate a valid user', function(done) {
            adHelper.auth(config.validUserData.userName, config.validUserData.password, function(err,auth) {
                if(err) {
                    done(err);
                } else {
                    done();
                }
            });
        }); 

        it('should fail to authenticate a invalid user', function(done) {
            adHelper.auth(config.invalidUserData.userName, config.invalidUserData.password, function(err,auth) {
                if(err) {
                    done()
                } else {
                    done(false);
                }
            });
        });   
    });
});