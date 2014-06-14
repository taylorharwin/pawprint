var db = require('../db_config.js');
var User = require('./user.js');

var Pet = db.Model.extend({
  tableName: 'pets',
  hasTimestamps: true,
  user: function() {
    return this.belongsToMany(User);
  }
});

module.exports = Pet;
