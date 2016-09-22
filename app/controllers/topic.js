var logger      = require('winston'); 
var business    = require('../business/topic')();

module.exports = function(app) {
    return {
        getTopics: function(req, res) {
            business.getTopics(req.query.date, req.query.category).then((items) => {
                res.status(200).json(items);
            }, (error) => {
                res.status(500).json(error);
            });
        },

        saveTopic: function(req, res) {
            business.saveTopic(req.body).then((r) => {
                res.status(200).json(r.topic);
            }, (error) => {
                res.status(500).json(error);
            });
        },

        getTopic: function(req, res) {
            business.getTopic(req.params.id).then((item) => {
                if(item) {
                    res.status(200).json(item);
                } else {
                    res.status(404).json({});
                }
            }, (error) => {
                res.status(404).json(error);
            });
        },

        deleteTopic: function(req, res) {
            business.deleteTopic(req.params.id).then((item) => {
                res.status(204).end();
            }, (error) => {
                res.status(500).json(error);
            });
        }
    };
}
