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

var userDataCallback = function() {
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
                      .insert({user_id: userid, pet_id: petid, vet_id: vetid, status: 'Pending'})
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

var serverDataCallback = function() {
  before(function(done) {
    db.knex('admin').returning('id')
      .insert({email: 'admi@n.com', password: 'password'})
      .then(function(adminid) {
        adminid = adminid[0];
        done();
      });
  });

  before(function(done) {
    db.knex('vetContact').returning('id')
      .insert({name: 'paul', title: 'receptionist', email: 'paul@vet.com', phone: '1234567890', vet_id: 1})
      .then(function(vetContactid) {
        vetContactid = vetContactid[0];
        done();
      });
  });

  before(function(done) {
    db.knex('contactHistory').returning('id')
      .insert({admin_id: 1, type: 'phone', request_id: 1, vetContact_id: 1})
      .then(function(contactHistoryid) {
        contactHistoryid = contactHistoryid[0];
        done();
      });
  });

  before(function(done) {
    db.knex('contactHistory').returning('id')
      .insert({admin_id: 1, type: 'phone', request_id: 1, vetContact_id: 1})
      .then(function(contactHistoryid) {
        contactHistoryid = contactHistoryid[0];
        done();
      });
  });
};

describe('Pawprint Tests', function() {
  userDataCallback();
  serverDataCallback();
  xdescribe('user routes', function() {
    describe('POST', function() {
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
      it('/user/:userid', function(done) {
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
      it('/user/:userid/pets', function(done) {
        request.get(reqUrl + '/user/1/pets', function(err, res, body) {
          expect(!!err).to.be.false;
          expect(res.statusCode).to.equal(200);
          body = JSON.parse(body);
          console.log('pets', body);
          expect(body).to.be.a('array');
          done();
        });
      });

      it('/user/:userid/pets/:petid/vaccines/', function(done) {
        request.get(reqUrl + '/user/1/pets/1/vaccines', function(err, res, body) {
          expect(!!err).to.be.false;
          expect(res.statusCode).to.equal(200);
          body = JSON.parse(body);
          console.log('vaccines', body);
          expect(body).to.be.a('array');
          done();
        });
      });

      it('/user/:userid/pets/:petid/requests', function(done) {
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

    describe('PUT', function() {
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
          console.log(err);
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

  describe('server routes', function() {
    describe('POST', function() {
      it('/admin', function(done) {
        var input = {
          email: 'admi@n.com',
          password: 'password'
        };
        request.post(reqUrl + '/admin', createForm(input), function(err, res, body) {
          expect(!!err).to.be.false;
          expect(res.statusCode).to.equal(200);
          body = JSON.parse(body);
          expect(body.id).to.equal(1);
          done();
        });
      });

      it('/admin/:adminid/requests/:requestid/logs', function(done) {
        var input = {
          type: 'email',
          notes: 'note123',
          vetContact_id: 1 // TODO: unsure if this is here
        };
        request(reqUrl + '/admin/1/requests/1/logs', createForm(input), function(err, res, body) {

        });
      });
    });

    describe('GET', function() {
      it('/admin/:adminid/requests', function(done) {
        request.get(reqUrl + '/admin/1/requests', function(err, res, body) {
          expect(!!err).to.be.false;
          expect(res.statusCode).to.equal(200);
          body = JSON.parse(body);
          expect(body).to.be.a('array');
          expect(!!body.length).to.equal(true);
          done();
        });
      });

      it('/admin/:adminid/users/:userid', function(done) {
        request.get(reqUrl + '/admin/1/users/1', function(err, res, body) {
          expect(!!err).to.be.false;
          expect(res.statusCode).to.equal(200);
          body = JSON.parse(body);
          expect(body.id).to.equal(1);
          expect(!!body.email).to.be.true;
          done();
        });
      });

      it('/admin/:adminid/pets/:petid', function(done) {
        request.get(reqUrl + '/admin/1/pets/1', function(err, res, body) {
          expect(!!err).to.be.false;
          expect(res.statusCode).to.equal(200);
          body = JSON.parse(body);
          expect(body.id).to.equal(1);
          expect(!!body.name).to.be.true;
          done();
        });
      });

      it('/admin/:adminid/vets/:vetid', function(done) {
        request.get(reqUrl + '/admin/1/vets/1', function(err, res, body) {
          expect(!!err).to.be.false;
          expect(res.statusCode).to.equal(200);
          body = JSON.parse(body);
          expect(body.id).to.equal(1);
          expect(!!body.practiceName).to.be.true;
          done();
        });
      });

      it('/admin/:adminid/requests/:requestid/logs', function(done) {
        request.get(reqUrl + '/admin/1/requests/1/logs', function(err, res, body) {
          expect(!!err).to.be.false;
          expect(res.statusCode).to.equal(200);
          body = JSON.parse(body);
          expect(body).to.be.a('array');
          expect(body.length).to.be.above(1);
          done();
        });
      });
    });

    describe('PUT', function() {
      it('/admin/:adminid/requests/:requestid', function(done) {
        var input = {
          status: 'Complete'
        };
        request.put(reqUrl + '/admin/1/requests/1', createForm(input), function(err, res, body) {
          expect(!!err).to.be.false;
          expect(res.statusCode).to.equal(200);
          body = JSON.parse(body);
          expect(body.status).to.equal('Complete');
          done();
        });
      });
    });
  });
});
