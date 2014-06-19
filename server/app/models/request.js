var db = require('../db_config.js');
require('./pet.js');
require('./user.js');
require('./vet.js');
require('./pet_vaccine.js');
require('./pdfRecord.js');
require('./contactHistory.js');

var Request = db.Model.extend({
  tableName: 'request',
  hasTimestamps: true,
  pet: function() {
    return this.belongsTo('Pet');
  },
  user: function() {
    return this.belongsTo('User');
  },
  vet: function() {
    return this.belongsTo('Vet');
  },
  pet_vaccine: function() {
    return this.hasMany('Pet_Vaccine');
  },
  pdfRecord: function() {
    return this.hasMany('PdfRecord');
  },
  contactHistory: function() {
    return this.hasMany('ContactHistory');
  }
});

module.exports = exports = db.model('Request', Request);
