var request = require('request');
var expect = require('chai').expect;
var db = require('../app/db_config.js');
var User = require('../app/models/user.js'),
    Pet = require('../app/models/pet.js'),
    Request = require('../app/models/request.js'),
    Vet = require('../app/models/vet.js');

var helpers = require('./test_helpers.js');
var createForm = helpers.createForm;
var userDataCallback = helpers.userDataCallback;
var serverDataCallback = helpers.serverDataCallback;
var reqUrl = helpers.reqUrl;

module.exports = exports = function() {
  describe('POST', function() {
    it('/user', function(done) {
      var input = {email: 'apple@dog.com', password: 'password'};
      request.post(reqUrl + '/user', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(201);
        body = JSON.parse(body);
        User.forge({id: body.id}).fetch().then(function(user) {
          expect(user);
        }).then(function() {
          done();
        });
      });
    });

    it('/user/:userid/pets', function(done) {
      var input = {name: 'testapple', gender: 'F'};
      request.post(reqUrl + '/user/1/pets', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(201);
        body = JSON.parse(body);
        Pet.forge({id: body.id}).fetch().then(function(pet) {
          expect(pet);
        }).then(function() {
          done();
        });
      });
    });

    it('/user/:userid/pets/:petid/requests', function(done) {
      var input = {practiceName: 'vet123', contactMethod: 'phone', phone: '123456789'};
      request.post(reqUrl + '/user/1/pets/1/requests', createForm(input), function(err, res, body) {
          expect(!!err).to.equal(false);
          expect(res.statusCode).to.equal(201);
          body = JSON.parse(body);
          Request.forge({id: body.id}).fetch().then(function(request) {
            expect(request);
          }).then(function() {
            done();
          });
        });
    });
  });

  describe('GET', function() {
    it('/user/:userid', function(done) {
      request.get(reqUrl + '/user/1', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(!!body.email).to.equal(true);
        done();
      });
    });

    // TODO: more comprehensive for the arrays
    it('/user/:userid/pets', function(done) {
      request.get(reqUrl + '/user/1/pets', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        console.log('pets', body);
        expect(body).to.be.a('array');
        done();
      });
    });

    it('/user/:userid/pets/:petid/vaccines/', function(done) {
      request.get(reqUrl + '/user/1/pets/1/vaccines', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        console.log('vaccines', body);
        expect(body).to.be.a('array');
        done();
      });
    });

    it('/user/:userid/pets/:petid/requests', function(done) {
      request.get(reqUrl + '/user/1/pets/1/requests', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        console.log('requests', body);
        expect(body).to.be.a('array');
        done();
      });
    });

    it('/user/vets', function(done) {
      request.get(reqUrl + '/user/vets', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body).to.be.a('array');
        done();
      });
    });
  });

  describe('PUT', function() {
    it('/user/:userid', function(done) {
      var input = {email: 'change@d.com', password: 'password2'};
      request.put(reqUrl + '/user/1', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(body.email).to.equal('change@d.com');
        done();
      });
    });

    it('/user/:userid/pets/:petid', function(done) {
      var input = {name: 'applechange'};
      request.put(reqUrl + '/user/1/pets/1', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(body.name).to.equal('applechange');
        done();
      });
    });
  });

  describe('DELETE', function() {
    var userid, petid, userpetid;
    before(function(done) {
      db.knex('user').returning('id')
        .insert({email: 'delet@e.com'})
        .then(function(id) {
          userid = id[0];
          done();
        });
    });

    before(function(done) {
      db.knex('pet').returning('id')
        .insert({name: 'deletepet'})
        .then(function(id) {
          petid = id[0];
          db.knex('user_pet').returning('id')
            .insert({user_id: 1, pet_id: petid})
            .then(function(id) {
              userpetid = id[0];
              done();
            });
        });
    });

    after(function(done) {
      db.knex('request')
        .where('id', 1)
        .update({status: 'Pending'})
        .then(function(){
          done();
        });
    });

    it('/user/:userid', function(done) {
      request.del(reqUrl + '/user/' + userid, function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        db.knex('user')
          .where('user_id', userid)
          .select()
          .then(function(found) {
            expect(found.length).to.equal(0);
            done();
          });
      });
    });

    it('/user/:userid/pets/:petid', function(done) {
      request.del(reqUrl + '/user/1/pets/' + petid, function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
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
      request.del(reqUrl + 'user/1/pets/1/requests/1', function(err, res, body) {
        console.log(err);
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        db.knex('request')
          .where('id', 1)
          .select()
          .then(function(found) {
            expect(found.status).to.equal('Canceled');
            done();
          });
      });
    });
  });
};
