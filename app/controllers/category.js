var logger      = require('winston'); 
var business    = require('../business/category')();

module.exports = function(app) {
    return {
        getCategories: function(req, res) {
            business.getCategories().then((items) => {
                res.status(200).json(items);
            }, (error) => {
                res.status(500).json(error);
            });
        }
    };
}