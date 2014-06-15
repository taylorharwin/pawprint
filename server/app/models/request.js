var db = require('../db_config.js');
var Pet = require('./pet.js');
var User = require('./user.js');

var Request = db.Model.extend({
  tableName: 'request',
  hasTimestamps: true,
  pet: function() {
    return this.belongsTo(Pet);
  },
  user: function() {
    return this.belongsTo(User);
  }
});

module.exports = Request;
