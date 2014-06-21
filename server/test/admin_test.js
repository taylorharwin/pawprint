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
var createForm = helpers.createForm;
var userDataCallback = helpers.userDataCallback;
var serverDataCallback = helpers.serverDataCallback;
var reqUrl = helpers.reqUrl;

var _deal = function(err, res, body, comparison, object) {

};

module.exports = exports = function() {
  xdescribe('POST', function() {
    it('/admin', function(done) {
      var input = {
        email: 'admi@n.com',
        password: 'password'
      };
      request.post(reqUrl + '/admin', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(201);
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
      request.post(reqUrl + '/admin/1/requests/1/logs', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(201);
        body = JSON.parse(body);
        expect(body.notes).to.equal('note123');
        expect(body.vetContact_id).to.equal('1');
        expect(body.admin_id).to.equal('1');
        expect(body.request_id).to.equal('1');
        done();
      });
    });

    it('/admin/:adminid/requests/:requestid/vaccines', function(done) {
      var input = {
        pet_id: 1,
        vaccine_id: 1,
      };
      request.post(reqUrl + '/admin/1/requests/1/vaccines', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(201);
        body = JSON.parse(body);
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(0);
        expect(!!body[0].pet_id).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/requests/:requestid/pdfs', function(done) {
      var input = {
        link: 'www.testpost.asd'
      };
      request.post(reqUrl + '/admin/1/requests/1/pdfs', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(201);
        body = JSON.parse(body);
        expect(body.request_id).to.equal(1);
        expect(body.link).to.equal('www.testpost.asd');
        done();
      });
    });

    it('/admin/:adminid/vets/:vetid/contacts', function(done) {
      var input = {
        name: 'pauldummy',
        title: 'dummyvet',
        email: 'paul@dummy.asd',
        phone: '1234567890'
      };
      request.post(reqUrl + '/admin/1/vets/1/contacts', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(201);
        body = JSON.parse(body);
        expect(body.vet_id).to.equal('1');
        expect(body.name).to.equal('pauldummy');
        done();
      });
    });

    it('/admin/:adminid/vaccines', function(done) {
      var input = {
        name: 'dummyvaccine'
      };
      request.post(reqUrl + '/admin/1/vaccines', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(201);
        body = JSON.parse(body);
        expect(body.name).to.equal('dummyvaccine');
        done();
      });
    });
  });

  xdescribe('GET', function() {
    it('/admin/:adminid/requests', function(done) {
      request.get(reqUrl + '/admin/1/requests', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body).to.be.a('array');
        expect(!!body.length).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/users/:userid', function(done) {
      request.get(reqUrl + '/admin/1/users/1', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(!!body.email).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/pets/:petid', function(done) {
      request.get(reqUrl + '/admin/1/pets/1', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(!!body.name).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/vets/:vetid', function(done) {
      request.get(reqUrl + '/admin/1/vets/1', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(!!body.practiceName).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/requests/:requestid/logs', function(done) {
      request.get(reqUrl + '/admin/1/requests/1/logs', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(1);
        done();
      });
    });

    it('/admin/:adminid/requests/:requestid/vaccines', function(done) {
      request.get(reqUrl + '/admin/1/requests/1/vaccines', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(0);
        expect(!!body[0].vaccine_id).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/requests/:requestid/pdfs', function(done) {
      request.get(reqUrl + '/admin/1/requests/1/pdfs', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(0);
        expect(!!body[0].link).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/vets/:vetid/contacts', function(done) {
      request.get(reqUrl + '/admin/1/vets/1/contacts', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(0);
        expect(body[0].vet_id).to.be.equal(1);
        expect(!!body[0].name).to.equal(true);
        done();
      });
    });

    it('/admin/:adminid/vaccines', function(done) {
      request.get(reqUrl + '/admin/1/vaccines', function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body).to.be.a('array');
        expect(body.length).to.be.above(0);
        expect(!!body[0].name).to.equal(true);
        done();
      });
    });
  });

  xdescribe('PUT', function() {
    it('/admin/:adminid/requests/:requestid', function(done) {
      var input = {
        status: 'Complete'
      };
      request.put(reqUrl + '/admin/1/requests/1', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.status).to.equal('Complete');
        done();
      });
    });

    xit('/admin/:adminid/requests/:requestid/logs/:logid', function(done) {
      var input = {
        notes: 'changed',
      };
      request.put(reqUrl + '/admin/1/requests/1/logs/1', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(body.notes).to.equal('Changed');
        done();
      });
    });

    xit('/admin/:adminid/requests/:requestid/vaccines/:vaccineid', function(done) {
      var input = {
        dateAdministered : new Date()
      };
      request.put(reqUrl + '/admin/1/requests/1/vaccines/1', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(!!body.dateAdministered).to.equal(true);
        done();
      });
    });

    xit('/admin/:adminid/requests/:requestid/pdfs/:pdfid', function(done) {
      var input = {
        link: 'www.put.asd'
      };
      request.put(reqUrl + '/admin/1/requests/1/pdfs/1', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(body.link).to.equal('www.put.asd');
        done();
      });
    });

    xit('/admin/:adminid/vets/:vetid/contacts/:contactid', function(done) {
      var input = {
        name: 'changedvetcontact'
      };
      request.put(reqUrl + '/admin/1/vets/1/contacts/1', createForm(input), function(err, res, body) {
        expect(!!err).to.equal(false);
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.id).to.equal(1);
        expect(body.vet_id).to.equal(1);
        expect(body.name).to.equal('changedvetcontact');
        done();
      });
    });
  });

  describe('DELETE', function() {
    before(function(done) {
      // create stuff

    });

    it('/admin/:adminid/requests/:requestid/logs/:logid', function(done) {
      request.del('/admin/1/requests/2/logs/:logid', function(err, req, body) {

      });
    });

    it('/admin/:adminid/requests/:requestid/logs/:logid', function(done) {
      request.del('/admin/1/requests/2/logs/:logid', function(err, req, body) {

      });
    });
  });
};
