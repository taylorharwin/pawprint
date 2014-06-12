var db = require('../app/app.js').get('db');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  // link: function() {
  //   return this.belongsTo(Link, 'link_id');
  // }
});

module.exports = User;
