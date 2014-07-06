var db = require('../db_config.js');
require('./pet.js');
require('./user.js');

var User_Pet = db.Model.extend({
  tableName: 'user_pet',
  hasTimestamps: true,
  pet: function () {
    return this.hasMany('Pet');
  },
  user: function () {
    return this.hasMany('User');
  }
});

module.exports = exports = db.model('User_Pet', User_Pet);
