var db = require('../db_config.js');
var Pet = require('./pet.js');
var Request = require('./request.js');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  pet: function() {
    return this.hasMany(Pet);
  },
  request: function() {
    return this.hasMany(Request);
  }
});

module.exports = User;
