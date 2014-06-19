var db = require('../db_config.js');
require('./contactHistory.js');

var Admin = db.Model.extend({
  tableName: 'admin',
  hasTimestamps: true,
  contactHistory: function() {
    return this.hasMany('ContactHistory');
  }
});

module.exports = exports = db.model('Admin', Admin);
