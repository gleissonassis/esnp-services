module.exports = function(app) {
    var controller = app.controllers.category;

    app.route('/v1/api/categories')
      .get(controller.getCategories);    
}
