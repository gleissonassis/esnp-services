var logger    = require('winston'); 

module.exports = function(app) {
    var Topics = app.models.topic;

    var controller = {
      getTopics: function(req, res) {
        logger.log('info', 'Getting topics from database');

        var d = req.query.date;

        var f = {};
        if(d) {
          f = {'date': {$gt: d}};
          logger.log('debug', 'A date querystring parameter was set', f);
        }

        Topics.find(f)
        .sort('date')
        .exec()
        .then(
          function(topics) {
            res.status(200).json(topics);
            logger.log('debug', '%d topics was returned', topics.length);
          },
          function(erro) {
            res.status(500).json(erro);
            logger.error('error', 'A error has occurred while getting topics from database');
          }
        );
      },

      saveTopic: function(req, res) {
        var _id = req.body._id;

        if(_id){
          logger.log('info', 'Saving a topic', req.body);

          Topics.findByIdAndUpdate(_id, req.body).exec()
          .then(function(topic) {
            res.status(200).json(topic)
            logger.log('info', 'The topic has been updated succesfully');
          },
          function(erro) {
            res.status(500).json(erro);
            logger.log('error', 'An error has ocurred while updating a topic', erro);
          });
        } else {
          logger.log('info', 'Saving a new topic', req.body);

          Topics.create(req.body)
          .then(function(topic) {
            res.status(201).json(topic);
            logger.log('info', 'The topic has been saved succesfully');
          },
          function(erro) {
            logger.log('error', 'An error has ocurred while saving a new topic', erro);
            res.status(500).json(erro);
          })
        }
      },

      getTopic: function(req, res) {
        var _id = req.params.id;

        logger.log('info', 'Getting a topic by id %s', _id);

        Topics.findById(_id).exec()
        .then(function(topic) {
          if(!topic) {            
            res.status(404).json({});
            logger.log('info', 'No topic found');
          } else {
            res.status(200).json(topic);
            logger.log('warn', 'Topic was found');
          }
        },
        function(erro) {
          res.status(404).json(erro);
          logger.log('error', 'An error has occurred while geeting a topic by id %s', _id, erro);
        })
      },

      deleteTopic: function(req, res) {
        var _id = req.params.id;
        
        logger.log('info', 'Deleting the topic by id %s', _id);

        Topics.remove({ '_id': _id}).exec()
        .then(function() {
            res.status(204).end();
            logger.log('info', 'The topic has been deleted succesfully');
        },
        function(erro) {
          res.status(500).json(erro);
          logger.log('error', 'An error has occurred while deleting a topic by id %s', _id, erro);
        });
      }
    };

    return controller;
}
