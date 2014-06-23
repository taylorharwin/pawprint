var request = require('request');
var expect = require('chai').expect;
var db = require('../app/db_config.js');
var User = require('../app/models/user.js'),
    Pet = require('../app/models/pet.js'),
    Request = require('../app/models/request.js'),
    Vet = require('../app/models/vet.js');
    
var helpers = require('./test_helpers.js');
var usertests = require('./user_test.js');
var admintests = require('./admin_test.js');

var createForm = helpers.createForm;
var userDataCallback = helpers.userDataCallback;
var adminDataCallback = helpers.adminDataCallback;
var reqUrl = helpers.reqUrl;

describe('Pawprint Tests', function() {
  userDataCallback();
  adminDataCallback();

  // TODO: add negative tests
  xdescribe('user routes', usertests);
  xdescribe('server routes', admintests);
});
