module.exports = function(app) {
    var controller = app.controllers.subscriber;

    app.route('/v1/api/subscribers')
      .post(controller.saveSubscriber);    
}
