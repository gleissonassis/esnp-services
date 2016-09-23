var assert      = require('assert');
var chai        = require('chai');
var expect      = chai.expect;
var settings    = require('../config/settings');
var jwtHelper   = require('../app/helpers/jwtHelper')();

describe('helper > jwtHelper', function() {
    describe('createToken', function() {
        it('should fail when a invalid payload was set', function() {
            expect(function() {
                jwtHelper.createToken(null);
            }).to.throw(Error);
        }); 

        it('should create a token for a valid payload', function() {
            expect(function() {
                jwtHelper.createToken({id:1});
            }).to.not.throw(Error);
        });
    });

    describe('verify', function() {
        it('should return true for a valid token', function(done) {
            var token = null;
            expect(function() {
                token = jwtHelper.createToken({id:1});
            }).to.not.throw(Error);

            jwtHelper.verify(token, function(err, decoded){
                expect(err).to.be.null;
                expect(decoded.id).to.equal(1);
                done();
            });
        });

        it('should return true for a invalid token', function(done) {
            var token = null;
            jwtHelper.verify(null, function(err, decoded){
                expect(err).to.be.not.null;
                done();
            });
        });
    });
});