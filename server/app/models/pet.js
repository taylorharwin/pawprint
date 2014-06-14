var db = require('../db_config.js');
var User = require('./user.js');
var Request = require('./request.js');

var Pet = db.Model.extend({
  tableName: 'pets',
  hasTimestamps: true,
  user: function() {
    return this.belongsToMany(User);
  },
  request: function() {
    return this.hasMany(Request);
  }
});

module.exports = Pet;
