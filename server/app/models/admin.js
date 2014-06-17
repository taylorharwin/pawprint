var db = require('../db_config.js');
var ContactHistory = require('./contactHistory.js');

var Admin = db.Model.extend({
  tableName: 'admin',
  hasTimestamps: true,
  contactHistory: function() {
    return this.hasMany(ContactHistory);
  }
});

module.exports = Admin;
