var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Q    = require('q');

module.exports = exports = {
  get: function (req, res, next) {
    res.send(200, 'Hello World');
    User.find({})
  },

  post: function (req, res, next) {

  }
};
