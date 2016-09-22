var mongoose = require('mongoose');

var model = null;

module.exports = function(){
  var schema = mongoose.Schema({
    registrationId :{
      type: String,
      required:true
    },
    latestRegistryDate :{
      type: Date,
      required: true
    }
  });

  if(model) {
    return model;
  } else {
    return model = mongoose.model('Subscribers', schema);
  }
}
