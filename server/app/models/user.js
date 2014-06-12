var db = require('../db_config.js');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  // link: function() {
  //   return this.belongsTo(Link, 'link_id');
  // }
});

module.exports = User;
