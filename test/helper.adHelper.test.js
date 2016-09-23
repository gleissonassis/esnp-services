var assert      = require('assert');
var config      = require('../config/settings');
var adHelper    = require('../app/helpers/adHelper')();

describe('ad-helper', function() {
    describe('auth', function() {
        it('deve autenticar um usuário existente', function(done) {
            adHelper.auth(config.validUserData.userName, config.validUserData.password, function(err,auth) {
                if(err) {
                    done(err);
                } else {
                    done();
                }
            });
        }); 

        it('deve falhar ao autenticar um usuário inexistente', function(done) {
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