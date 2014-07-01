var helpers = require('./test_helpers.js');
var usertests = require('./user_test.js');
var admintests = require('./admin_test.js');

var userDataCallback = helpers.userDataCallback;
var adminDataCallback = helpers.adminDataCallback;

describe('Pawprint Tests', function () {
  userDataCallback();
  adminDataCallback();

  // TODO: add negative tests
  describe('user routes', usertests);
  describe('server routes', admintests);
});
