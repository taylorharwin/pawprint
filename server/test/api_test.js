var request = require('request');
var expect = require('chai').expect;
var db = require('../app/db_config.js');
var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Pet = require('../app/models/pet.js'),
    Pets = require('../app/collections/pets.js'),
    Request = require('../app/models/request.js'),
    Requests = require('../app/collections/requests.js'),
    Vet = require('../app/models/vet.js'),
    Vets = require('../app/collections/vets.js');

var helpers = require('./test_helpers.js');
var usertests = require('./user_test.js');
var admintests = require('./admin_test.js');

var createForm = helpers.createForm;
var userDataCallback = helpers.userDataCallback;
var serverDataCallback = helpers.serverDataCallback;
var reqUrl = helpers.reqUrl;

describe('Pawprint Tests', function() {
  userDataCallback();
  serverDataCallback();

  // TODO: add negative tests
  describe('user routes', usertests);
  describe('server routes', admintests);
});
