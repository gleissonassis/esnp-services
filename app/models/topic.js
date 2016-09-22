var mongoose = require('mongoose');

var model = null;

module.exports = function(){
  var schema = mongoose.Schema({
    title :{
      type: String,
      required:true
    },
    thumbUrl :{
      type: String,
      required: true
    },
    category :{
      type: String,
      required: true
    },
    date :{
      type: Date,
      required: true
    },
    body :{
      type: String,
      required: false
    },
    url :{
      type: String,
      required: false
    },
  });
  
  if(model) {
    return model;
  } else {
    return model = mongoose.model('Topics', schema);
  }
}
