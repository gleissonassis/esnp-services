var logger      = require('winston'); 
var User    = require('../business/user')

module.exports = function(app) {
    var business = new User();

    return {
        authenticateUser: function(req, res) {
            business.authenticateUser(req.body.userName, req.body.password).then((token) => {
                res.status(200).json(token);
            }, (error) => {
                res.status(500).json(error);
            })
        }
    };
}