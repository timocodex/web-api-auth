var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var uniqueValidator = require('mongoose-unique-validator');

// create a schema
var userSchema = new Schema({
  name: {
    type:String
  },
  desc: {
    type:String
  },
  email: {
    type: String,
    validate:{
      validator: function(email){
          return re.test(email);
      },
      message: 'email format is wrong'
    },
    required:[true,'email is required'],
    unique:true
  },
  password:{
    type: String,
    required:[true,'password is required']
  }
});

userSchema.plugin(uniqueValidator);

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('users', userSchema);

// make this available to our users in our Node applications
module.exports = User;
