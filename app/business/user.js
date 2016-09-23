var logger          = require('winston');
var Promise         = require('promise');
var adHelper        = require('../helpers/adHelper')();
var jwtHelper       = require('../helpers/jwtHelper')();

module.exports = function() {
    return {
        authenticateUser: (userName, password) => {
            return new Promise((resolve, reject) => {
                try {
                    adHelper.auth(userName, password, function(err, auth) {
                        if (err || !auth) {
                            reject(err);  
                        } else if (auth) {
                            var token = jwtHelper.createToken({userName: userName});
                            resolve({token: token});
                        }
                    });
                } catch(e) {
                    reject(e);
                }
            });
        },

        verifyToken : (token) => {
            return new Promise((resolve, reject) => {
                jwtHelper.verify(token, function(error, decoded) {
                    if (err) {
                        reject(error);
                    } else {
                        resolve(decoded);
                    }
                });
            });            
        }
    };
}

