var db = require('../db_config.js');
var Vet = require('./vet.js')

var VetContact = db.Model.extend({
  tableName: 'vetContact',
  hasTimestamps: true,
  vet: function() {
    return this.belongsTo(Vet);
  }
});

module.exports = VetContact;
