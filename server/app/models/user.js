var db = require('../db_config.js');
var Pet = require('./pet.js')

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  pet: function() {
    return this.hasMany(Pet);
  }
});

module.exports = User;
