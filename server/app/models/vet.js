var db = require('../db_config.js');

var Vet = db.Model.extend({
  tableName: 'vet',
  hasTimestamps: true
});

module.exports = Vet;
