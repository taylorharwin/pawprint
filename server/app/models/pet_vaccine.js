var db = require('../db_config.js');
require('./pet.js');
require('./vaccine.js');
require('./request.js');

var Pet_Vaccine = db.Model.extend({
  tableName: 'pet_vaccine',
  hasTimestamps: true,
  request: function () {
    return this.belongsTo('Request');
  },
  pet: function () {
    return this.belongsTo('Pet');
  },
  vaccine: function () {
    return this.belongsTo('Vaccine');
  }
});

module.exports = exports = db.model('Pet_Vaccine', Pet_Vaccine);
