var db = require('../db_config.js');
require('./user.js');
require('./request.js');
require('./pet_vaccine.js');
require('./user_pet.js');

var Pet = db.Model.extend({
  tableName: 'pet',
  hasTimestamps: true,
  user: function () {
    return this.belongsToMany('User').through('User_Pet', 'pet_id', 'user_id');
  },
  user_pet: function () {
    return this.hasMany('User_Pet');
  },
  request: function () {
    return this.hasMany('Request');
  },
  pet_vaccine: function () {
    return this.hasMany('Pet_Vaccine');
  }
});

module.exports = exports = db.model('Pet', Pet);
