module.exports = function(app) {
    var controller = app.controllers.api;

    app.route('/api')
      .get(controller.getAPIInfo);
}
