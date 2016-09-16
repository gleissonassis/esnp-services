module.exports = function(app) {
    var controller = app.controllers.topic;

    app.route('/api/topics')
      .get(controller.getTopics)
      .post(controller.saveTopic);
    app.route('/api/topics/:id')
      .get(controller.getTopic)
      .delete(controller.deleteTopic);
}
