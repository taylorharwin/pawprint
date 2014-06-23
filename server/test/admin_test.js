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
var _text = helpers._test;

module.exports = exports = function() {
  describe('POST', function() {
    it('/admin', function(done) {
      var input = {
        email: 'admi@n.com',
        password: 'password'
      };
      _test('post', '/admin', 201, function(body) {
        expect(body.id).to.equal(1);
        done();
      }, input);
    });

    it('/admin/:adminid/requests/:requestid/logs', function(done) {
      var input = {
        type: 'email',
        notes: 'note123',
        vetContact_id: 1 // TODO: unsure if this is here
      };
      _test('post', '/admin/1/requests/1/logs', 201, function(body) {
        expect(body.notes).to.equal('note123');
        expect(body.vetContact_id).to.equal('1');
        expect(body.admin_id).to.equal('1');
        expect(body.request_id).to.equal('1');
        done();
      }, input);
    });

    it('/admin/:adminid/requests/:requestid/vaccines', function(done) {
      var input = {
        pet_id: 1,
        vaccine_id: 1,
      };
      _test('post', '/admin/1/requests/1/vaccines', 201, function(body) {
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(0);
        expect(!!body[0].pet_id).to.equal(true);
        done();
      }, input);
    });

    it('/admin/:adminid/requests/:requestid/pdfs', function(done) {
      var input = {
        link: 'www.testpost.asd'
      };
      _test('post', '/admin/1/requests/1/pdfs', 201, function(body) {
        expect(body.request_id).to.equal(1);
        expect(body.link).to.equal('www.testpost.asd');
        done();
      }, input);
    });

    it('/admin/:adminid/vets/:vetid/contacts', function(done) {
      var input = {
        name: 'pauldummy',
        title: 'dummyvet',
        email: 'paul@dummy.asd',
        phone: '1234567890'
      };
      _test('post', '/admin/1/vets/1/contacts', 201, function(body) {
        expect(body.vet_id).to.equal('1');
        expect(body.name).to.equal('pauldummy');
        done();
      }, input);
    });

    it('/admin/:adminid/vaccines', function(done) {
      var input = {
        name: 'dummyvaccine'
      };
      _test('post', '/admin/1/vaccines', 201, function(body) {
        body = JSON.parse(body);
        expect(body.name).to.equal('dummyvaccine');
        done();
      }, input);
    });
  });

  describe('GET', function() {
    it('/admin/:adminid/requests', function(done) {
      _test('get', '/admin/1/requests', 200, function(body) {
        expect(body).to.be.a('array');
        expect(!!body.length).to.equal(true);
        done();
      }, input);
    });

    it('/admin/:adminid/users/:userid', function(done) {
      _test('get', '/admin/1/users/1', 200, function(body) {
        expect(body.id).to.equal(1);
        expect(!!body.email).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/pets/:petid', function(done) {
      _test('get', '/admin/1/pets/1', 200, function(body) {
        expect(body.id).to.equal(1);
        expect(!!body.name).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/vets/:vetid', function(done) {
      _test('get', '/admin/1/vets/1', 200, function(body) {
        expect(body.id).to.equal(1);
        expect(!!body.practiceName).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/requests/:requestid/logs', function(done) {
      _test('get', '/admin/1/requests/1/logs', 200, function(body) {
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(1);
        done();
      });
    });

    it('/admin/:adminid/requests/:requestid/vaccines', function(done) {
      _test('get', '/admin/1/requests/1/vaccines', 200, function(body) {
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(0);
        expect(!!body[0].vaccine_id).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/requests/:requestid/pdfs', function(done) {
      _test('get', '/admin/1/requests/1/pdfs', 200, function(body) {
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(0);
        expect(!!body[0].link).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/vets/:vetid/contacts', function(done) {
      _test('get', '/admin/1/vets/1/contacts', 200, function(body){
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(0);
        expect(body[0].vet_id).to.be.equal(1);
        expect(!!body[0].name).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/vaccines', function(done) {
      _test('get', '/admin/1/vaccines', 200, function(body) {
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(0);
        expect(!!body[0].name).to.equal(true);
        done();
      });
    });
  });

  describe('PUT', function() {
    it('/admin/:adminid/requests/:requestid', function(done) {
      var input = {
        status: 'Complete'
      };
      _test('put', '/admin/1/requests/1', 200, function(body) {
        expect(body.status).to.equal('Complete');
        done();
      }, input);
    });

    it('/admin/:adminid/requests/:requestid/logs/:logid', function(done) {
      var input = {
        notes: 'changed',
      };
      _test('put', '/admin/1/requests/1/logs/1', 200, function(body) {
        expect(body.id).to.equal(1);
        expect(body.notes).to.equal('Changed');
        done();
      }, input);
    });

    it('/admin/:adminid/requests/:requestid/vaccines/:vaccineid', function(done) {
      var input = {
        dateAdministered : new Date()
      };
      _test('put', '/admin/1/requests/1/vaccines/1', 200, function(body) {
        expect(body.id).to.equal(1);
        expect(!!body.dateAdministered).to.equal(true);
        done();
      }, input);
    });

    it('/admin/:adminid/requests/:requestid/pdfs/:pdfid', function(done) {
      var input = {
        link: 'www.put.asd'
      };
      _test('put', '/admin/1/requests/1/pdfs/1', 200, function(body) {
        expect(body.id).to.equal(1);
        expect(body.link).to.equal('www.put.asd');
        done();
      }, input);
    });

    it('/admin/:adminid/vets/:vetid/contacts/:contactid', function(done) {
      var input = {
        name: 'changedvetcontact'
      };
      _test('put', '/admin/1/vets/1/contacts/1', 200, function(body) {
        expect(body.id).to.equal(1);
        expect(body.vet_id).to.equal(1);
        expect(body.name).to.equal('changedvetcontact');
        done();
      }, input);
    });
  });

  // describe('DELETE', function() {
  //   before(function(done) {
  //     // create stuff

  //   });

  //   it('/admin/:adminid/requests/:requestid/logs/:logid', function(done) {
  //     request.del('/admin/1/requests/2/logs/:logid', function(err, req, body) {

  //     });
  //   });

  //   it('/admin/:adminid/requests/:requestid/logs/:logid', function(done) {
  //     request.del('/admin/1/requests/2/logs/:logid', function(err, req, body) {

  //     });
  //   });
  // });
};
