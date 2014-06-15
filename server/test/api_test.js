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

describe('User /user', function() {
  describe('/:id', function() {
    // beforeEach(function(done) {
    //   // create database entries
    //   var userid = '12345';
    //   var userdata = {
    //     id : '12345',
    //     email : 'apple@hackreactor.com',
    //   };
    //   done();
    // });

    // it('get on /user/:id', function(done){
    //   var reqPath = '/user/' + userid;
    //   testPath(reqPath, 'get', 200, done, userdata);
    // });

    it('post on /user', function(done){
      request(app)
        .post('/user')
        .send({
          email: 'yolo@yolo.com',
          firstName: 'apple'
        })
        .expect(200)
        .end(done);
    });

    it('post on /user/:id/pet', function(done){
    request(app)
      .post('/user/1/pets')
      .send({
        name: 'apple',
      })
      .expect(200)
      .end(done);
    });

  }); 
});
