// var request = require('supertest');
// var app = require('../app/app.js');

var request = require('request');
var express = require('express');
var expect = require('chai').expect;
var Q = require('q');
var db = require('../app/db_config.js');
var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Pet = require('../app/models/pet.js'),
    Pets = require('../app/collections/pets.js'),
    Request = require('../app/models/request.js'),
    Requests = require('../app/collections/requests.js'),
    Vet = require('../app/models/vet.js'),
    Vets = require('../app/collections/vets.js');
    
var createForm = function(obj) {
  return {form : obj};
};

var reqPort = 9000;
var reqUrl = 'http://localhost:' + reqPort;

var testDataCallback = function() {
  before(function(done) {
    db.knex('user').returning('id')
      .insert({email: 'hell@o.com', password: 'password'})
      .then(function(userid) {
        userid = userid[0];
        db.knex('pet').returning('id')
          .insert({name: 'appl'})
          .then(function(petid) {
            petid = petid[0];
            db.knex('user_pet').returning('id')
              .insert({user_id: userid, pet_id: petid})
              .then(function(userpet){
                db.knex('vet').returning('id')
                  .insert({practiceName: 'vetpractice', contactMethod: 'phone'})
                  .then(function(vetid) {
                    vetid = vetid[0];
                    db.knex('request').returning('id')
                      .insert({user_id: userid, pet_id: petid, vet_id: vetid, status: 'Complete'})
                      .then(function(requestid){
                        requestid = requestid[0];
                        db.knex('vaccine').returning('id')
                          .insert({name: 'vaccine1'})
                          .then(function(vaccineid) {
                            vaccineid = vaccineid[0];
                            db.knex('pet_vaccine').returning('id')
                              .insert({pet_id: petid, vaccine_id: vaccineid, request_id: requestid})
                              .then(function(petvaccine) {
                                db.knex('pet_vaccine').returning('id')
                                  .insert({pet_id: petid, vaccine_id: vaccineid, request_id: requestid})
                                  .then(function(petvaccine2) {
                                    done();
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  });
};

describe('user routes', function() {
  testDataCallback();
  xdescribe('POST', function() {
    it('/user', function(done) {
      var input = {email: 'apple@dog.com', password: 'password'};
      request.post(reqUrl + '/user', createForm(input), function(err, res, body) {
        expect(!!err).to.be.false;
        expect(res.statusCode).to.equal(201);
        body = JSON.parse(body);
        User.forge({id: body.id}).fetch().then(function(user) {
          // console.log(user);
          expect(user);
        }).then(function() {
          done();
        });
      });
    });

    it('/user/:userid/pets', function(done) {
      var input = {name: 'testapple', gender: 'F'};
      request.post(reqUrl + '/user/1/pets', createForm(input), function(err, res, body) {
        expect(!!err).to.be.false;
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
          expect(!!err).to.be.false;
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
    xit('/user/:userid', function(done) {
      request.get(reqUrl + '/user/1', function(err, res, body) {
        expect(!!err).to.be.false;
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(!!body.email).to.be.true;
        done();
      });
    });

    // TODO: more comprehensive for the arrays
    xit('/user/:userid/pets', function(done) {
      request.get(reqUrl + '/user/1/pets', function(err, res, body) {
        expect(!!err).to.be.false;
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        console.log('pets', body);
        expect(body).to.be.a('array');
        done();
      });
    });

    xit('/user/:userid/pets/:petid/vaccines/', function(done) {
      request.get(reqUrl + '/user/1/pets/1/vaccines', function(err, res, body) {
        expect(!!err).to.be.false;
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        console.log('vaccines', body);
        expect(body).to.be.a('array');
        done();
      });
    });

    xit('/user/:userid/pets/:petid/requests', function(done) {
      request.get(reqUrl + '/user/1/pets/1/requests', function(err, res, body) {
        expect(!!err).to.be.false;
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        console.log('requests', body);
        expect(body).to.be.a('array');
        done();
      });
    });

    it('/user/vets', function(done) {
      request.get(reqUrl + '/user/vets', function(err, res, body) {
        expect(!!err).to.be.false;
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        // console.log('vets', body);
        expect(body).to.be.a('array');
        done();
      });
    });
  });

  xdescribe('PUT', function() {
    it('/user/:userid', function(done) {
      var input = {email: 'change@d.com', password: 'password2'};
      request.put(reqUrl + '/user/1', createForm(input), function(err, res, body) {
        expect(!!err).to.be.false;
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
        expect(!!err).to.be.false;
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(body.name).to.equal('applechange');
        done();
      });
    });
  });

  xdescribe('DELETE', function() {
    var userid, petid, userpetid;
    before(function(done) {
      db.knex('user').returning('id')
        .insert({email: 'delet@e.com'})
        .then(function(id) {
          userid = id;
          done();
        });
    });

    before(function(done) {
      db.knex('pet').returning('id')
        .insert({name: 'deletepet'})
        .then(function(id) {
          petid = id;
          db.knex('user_pet').returning('id')
            .insert({user_id: 1, pet_id: petid})
            .then(function(id) {
              userpetid = id;
              done();
            });
        });
    });

    after(function(done) {
      db.knex('request')
        .where('id', 1)
        .update({user_id: userid, pet_id: petid, vet_id: vetid, status: 'Complete'})
        .then(function(){
          done();
        });
    });

    it('/user/:userid', function(done) {
      request.del(reqUrl + '/user/' + userid, function(err, res, body) {
        expect(!!err).to.be.false;
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
        expect(!!err).to.be.false;
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
        expect(!!err).to.be.false;
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
});
