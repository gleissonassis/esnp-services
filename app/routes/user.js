module.exports = function(app) {
    var controller = app.controllers.user;

    app.route('/v1/api/users/authenticate')
        .post(controller.authenticateUser);
}
