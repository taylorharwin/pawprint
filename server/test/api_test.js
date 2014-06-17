var request = require('supertest');
var express = require('express');
var Q = require('q');
var expect = require('chai').expect;

var app = require('../app/app.js');
var db = require('../app/db_config.js');

var testPath = function(path, type, code, done, expect, cb){
  request(app)[type.toLowerCase()](path)
    .expect(code)
    .expect(function(res) {
      if (expect) {
        testCallback(res, expect);
      }
      if (cb) {
        cb(res);
      }
    })
    .end(done);
};

var testCallback = function(res, expect){
  for (var key in expect) {
    expect(res.body.key).to.equal(expect.key);
  }
};

describe('pawprint tests', function(){ 
  describe('/user post requests', function() {
    xit('post /user', function(done){
      request(app)
        .post('/user')
        .send({
          email: 'apple@yolo.com',
          firstName: 'apple'
        })
        .expect(201)
        .end(done);
    });

    it('post /user/:id/pet', function(done){
      request(app)
        .post('/user/2/pet')
        .send({
          name: 'apple3',
        })
        .expect(201)
        .end(done);
    });

    xit('post /user/vet', function(done){
      request(app)
        .post('/user/vet')
        .send({
          practiceName: 'appleVet',
        })
        .expect(201)
        .end(done);
    });

    xit('post /user/:userid/pet/:petid/request', function(done){
      request(app)
        .post('/user/1/pet/1/request')
        .send({
          vet_id: 1,
        })
        .expect(201)
        .end(done);
    });
  });

  describe('/user put requests', function() {
    xit('put /user/:userid', function(done){
      request(app)
        .put('/user/1')
        .send({
          email: 'applechanged@yolo.com',
          firstName: 'apple'
        })
        .expect(200)
        .end(done);
    });

    xit('put /user/:userid/pet/:petid', function(done){
      request(app)
        .put('/user/1/pet/1')
        .send({
          name: 'apple2',
          gender: 'F'
        })
        .expect(200)
        .end(done);
    });
  });

  xdescribe('/admin post requests', function() {
    it('post /admin/:adminid/request/:requestid/vaccine', function(done){
      request(app)
        .post('/admin/1/request/1/vaccine')
        .send([{
          vaccine_id : 1,
        }, {vaccine_id : 1}])
        .expect(201)
        .end(done);
    });
  });
});
