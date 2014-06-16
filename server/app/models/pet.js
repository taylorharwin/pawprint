var db = require('../db_config.js');
var User = require('./user.js');
var Request = require('./request.js');
var Vaccine = require('./vaccine.js');
var Pet_Vaccine = require('./pet_vaccine.js');

var Pet = db.Model.extend({
  tableName: 'pet',
  hasTimestamps: true,
  user: function() {
    return this.belongsToMany(User, 'user_pet', 'pet_id', 'user_id');
  }
});

module.exports = Pet;
