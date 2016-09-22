var logger      = require('winston'); 
var business  = require('../business/subscriber')();

module.exports = function() {
    return {
        saveSubscriber: function(req, res) {
            business.saveSubscriber(req.body).then((r) => {
                if(r.isInserted) {
                    res.status(201).json(r.subscriber);
                } else {
                    res.status(200).json(r.subscriber);
                }
            }, (error) => {
                res.status(500).json(error);
            });
        }
    }
}