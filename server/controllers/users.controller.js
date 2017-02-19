var User = require('../models/user')
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken')
module.exports = {
  create: function(req,res){
    var newUser = new User({
      name:'-',
      desc:'-',
      email: req.body.email,
      password: passwordHash.generate(req.body.password)
    })

    newUser.save(function(err){
      if(err){
        var ero = err.errors.email||err.errors.password
        res.json(ero.message)
      }
      else{
        res.json('Success to register')
      }
    })
  },

  login: function(req,res){
  var hashed
  User.findOne({email: req.body.email}).then(function(user){
    if(!user){
      res.json({ success: false, message: 'Authentication failed. no such username.' });
    }
    else if(user && passwordHash.verify(req.body.password,user.password)===false ){
      res.json({ success: false, message: 'Authentication failed. Wrong password.'});
    }
    else if(user && passwordHash.verify(req.body.password,user.password)===true){
      var token = jwt.sign({id:user._id,email:user.email}, 'superSecret',{expiresIn: 60*60})
      res.json(
        {
          success: true,
          token: token,
          message:'Success to login',
          user:user._id
        }
      );
    }
  })
},
  update:function(req,res){
    User.findOne({_id:req.params.id},function(err,result){
      result.name = req.body.name
      result.desc = req.body.desc

      result.save(function(err){
        if(err){
          res.send(err)
        }
        else{
          res.json(result)
        }
      })
    })
  },
  show: function(req,res){
    User.find({},function(err,user){
      if(err){
        res.json(err)
      }
      else{

        res.json(user)
      }
    })
  },
  delete: function(req,res){
    User.remove({},function(err){
      if(err){
        res.send(err)
      }
      else{
        res.send('success to remove')
      }
    })
  }
}
