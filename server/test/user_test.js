var expect = require('chai').expect;
var db = require('../app/db_config.js');
var User = require('../app/models/user.js');
var Pet = require('../app/models/pet.js');
var Request = require('../app/models/request.js');
var Vet = require('../app/models/vet.js');
var helpers = require('./test_helpers.js');
var createForm = helpers.createForm;
var userDataCallback = helpers.userDataCallback;
var serverDataCallback = helpers.serverDataCallback;
var insert = helpers.insert;
var reqUrl = helpers.reqUrl;
var _test = helpers._test;

module.exports = exports = function() {
  describe('POST', function() {
    it('/user', function(done) {
      var input = {email: 'apple@dog.com', password: 'password'};
      _test('post', '/user', 201, function(body) {
        User.forge({id: body.id}).fetch().then(function(user) {
          expect(user);
        }).then(function() {
          done();
        });
      }, input);
    });

    it('/user/:userid/pets', function(done) {
      var input = {name: 'testapple', gender: 'F'};
      _test('post', '/user/1/pets', 201, function(body) {
        Pet.forge({id: body.id}).fetch().then(function(pet) {
          console.log(pet);
          expect(pet);
        }).then(function() {
          done();
        });
      }, input);
    });

    xit('/user/:userid/pets/:petid/requests', function(done) {
      var input = {practiceName: 'vet123', contactMethod: 'phone', phone: '12345'};
      _test('post', '/user/1/pets/1/requests', 201, function(body) {
        Request.forge({id: body.id}).fetch().then(function(request) {
          expect(request);
        }).then(function() {
          done();
        });
      }, input);
    });
  });

  describe('GET', function() {
    it('/user/:userid', function(done) {
      _test('get', '/user/1', 200, function(body) {
        expect(body.id).to.equal(1);
        expect(!!body.email).to.equal(true);
        done();
      });
    });

    // TODO: more comprehensive for the arrays
    it('/user/:userid/pets', function(done) {
      _test('get', '/user/1/pets', 200, function(body) {
        expect(body).to.be.a('array');
        done();
      });
    });

    it('/user/:userid/pets/:petid/vaccines/', function(done) {
      _test('get', '/user/1/pets/1/vaccines', 200, function(body) {
        expect(body).to.be.a('array');
        done();
      });
    });

    it('/user/:userid/pets/:petid/requests', function(done) {
      _test('get', '/user/1/pets/1/requests', 200, function(body) {
        expect(body).to.be.a('array');
        done();
      });
    });

    xit('/user/vets', function(done) {
      _test('get', '/user/vets', 200, function(body) {
        expect(body).to.be.a('array');
        done();
      });
    });
  });

  describe('PUT', function() {
    it('/user/:userid', function(done) {
      var input = {email: 'change@d.com', password: 'password2'};
      _test('put', '/user/1', 200, function(body) {
        expect(body.id).to.equal(1);
        expect(body.email).to.equal('change@d.com');
        done();
      }, input);
    });

    it('/user/:userid/pets/:petid', function(done) {
      var input = {name: 'applechange'};
      _test('put', '/user/1/pets/1', 200, function(body) {
        expect(body.id).to.equal(1);
        expect(body.name).to.equal('applechange');
        done();
      }, input);
    });
  });

  describe('DELETE', function() {
    var userid, petid, userpetid;
    before(function(done) {
      insert('user', 'id', {email: 'delet@e.com'})
        .then(function(id) {
          userid = id[0];
          return insert('pet', 'id', {name: 'deletepet'});
        })
        .then(function(id) {
          petid = id[0];
          return insert('user_pet', 'id', {user_id: 1, pet_id: petid});
        })
        .then(function(id) {
          done();
        });
    });

    after(function(done) {
      db.knex('request')
        .where('id', 1)
        .update({status: 'pending'})
        .then(function(){
          done();
        });
    });

    xit('/user/:userid', function(done) {
      _test('del', '/user/' + userid, 200, function(body) {
        db.knex('user')
          .where('user_id', userid)
          .select()
          .then(function(found) {
            expect(found.status).to.equal('not active');
            done();
          });
      });
    });

    xit('/user/:userid/pets/:petid', function(done) {
      _test('del', '/user/1/pets/' + petid, 200, function(body) {
        db.knex('user_pet')
          .where('id', userpetid)
          .select()
          .then(function(found) {
            expect(found.length).to.equal(0);
            done();
          });
      });
    });

    it('/user/:userid/pets/:petid/requests/:requestid', function(done) {
      _test('del', '/user/1/pets/1/requests/1', 200, function(body) {
        db.knex('request')
          .where('id', 1)
          .select()
          .then(function(found) {
            expect(found[0].status).to.equal('canceled');
            done();
          });
      });
    });
  });
};
