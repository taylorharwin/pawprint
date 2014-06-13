var request = require('supertest');
var express = require('express');
var Q = require('q');
var expect = require('chai').expect;

var app = require('../app/app.js');
var db = require('../app/db_config.js');

'get'
'put'

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
    expect(res.key).to.equal(expect.key);
  }
};

describe('User /user', function() {
  beforeEach(function(done) {
    var userid = '12345';
    done();
  });
  describe('/:id', function() {
    it('get on /user/:id', function(done){
      var reqPath = '/user/' + userid;
      var cb = function(res) {
        res.body
      };
      testPath(reqPath, 'get', 200, done, null, cb);
    });
    it('Responds to get requests on /song with song data', function(done){
      request(app)
        .get('/song')
        .expect(function(res) {
          Song.findOne({'filename' : 'testing.mp3'})
            .exec(function(err,song){
              if(err) console.log(err);
              expect(song.echoData.status).to.equal('complete');
            });            
        })
        .end(done);
    });
  }); 
});
