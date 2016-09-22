var logger    = require('winston'); 

module.exports = function(app) {
    var Topics = app.models.topic;

    var controller = {
      getCategories: function(req, res) {
        logger.log('info', 'Getting categories from database');

        Topics.find()
        .distinct('category', function(error, categories) {
            if(error) {
                res.status(500).json(error);
                logger.log('error', 'An error has occurred while getting categories from database', error);
            } else {
                categories.sort()
                res.status(200).json(categories);
                logger.log('debug', '%d categories was returned', categories.length);
            }
          }
         );
      }
    };

    return controller;
}
