module.exports = function(app) {
    var controller = app.controllers.topic;

    app.route('/v1/api/topics')
      .get(controller.getTopics)
      .post(app.requireLogin, controller.saveTopic);
    app.route('/v1/api/topics/:id')
      .get(controller.getTopic)
      .delete(app.requireLogin, controller.deleteTopic);
}
