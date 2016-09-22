var mongoose = require('mongoose');

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
    }
  });

  return mongoose.model('Topics', schema);
}
