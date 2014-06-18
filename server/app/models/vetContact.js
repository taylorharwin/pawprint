var db = require('../db_config.js');
var Vet = require('./vet.js');
var ContactHistory = require('./contactHistory.js');

var VetContact = db.Model.extend({
  tableName: 'vetContact',
  hasTimestamps: true,
  vet: function() {
    return this.belongsTo(Vet);
  },
  contactHistory: function() {
    return this.hasMany(ContactHistory);
  }
});

module.exports = VetContact;
