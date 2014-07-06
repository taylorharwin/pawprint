var db = require('../db_config.js');
require('./request.js');
require('./pet.js');
require('./pet_vaccine.js');

var Vaccine = db.Model.extend({
  tableName: 'vaccine',
  hasTimestamps: true,
  pet_vaccine: function () {
    return this.hasMany('Pet_Vaccine');
  }
});

module.exports = exports = db.model('Vaccine', Vaccine);
