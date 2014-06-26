var User = require('../app/models/user.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var login = function (req, res) {
  User.forge({email: req.body.email}).fetch()
    .then(function (user) {
      if (!user) {
        res.send(401, 'No such user exists');
      } else {
        bcrypt.compare(req.body.password, user.attributes.password, function (err, result) {
          if (result) {
            var token = jwt.sign(user, process.env.USER_SECRET || 'usersecret', {expiresInMinutes: 60*5});
            console.log(token);
            // user.save({'jwt': token}, {patch: true});
            res.send(200, {token: token, id: user.id});
          } else {
            res.send(401, 'Wrong password');
          }
        });
      }
    })
    .catch(function(err){
      console.error(err);
      res.send(500, 'Internal Server Error');
    });
};

var signup = function (req, res) {
  User.forge({email: req.body.email}).fetch()
    .then(function (user) {
      if (user) {
        res.send(401, 'User already exists');
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            req.body.password = hash;
            User.forge(req.body).save().then(function (newUser) {
              var token = jwt.sign(newUser, process.env.USER_SECRET || 'usersecret', {expiresInMinutes: 60*5});
              res.send(200, {token: token, id: newUser.id});
            });
          });
        });
      }
    })
    .catch(function(err){
      console.error(err);
      res.send(500, 'Internal Server Error');
    });
};

module.exports = exports = {
  login : login,
  signup : signup
};