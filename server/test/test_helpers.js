var db = require('../app/db_config.js');
var request = require('request');
var expect = require('chai').expect;
var User = require('../app/models/user.js'),
    Pet = require('../app/models/pet.js'),
    Request = require('../app/models/request.js'),
    Vet = require('../app/models/vet.js');

    
var reqPort = 9000;
var reqUrl = 'http://localhost:' + reqPort;

var createForm = function(obj) {
  if (obj) {
    return {form : obj};
  }
};

var insert = function(table, prop, data) {
  return db.knex(table).returning(prop)
    .insert(data);
};

var _test = function(reqType, url, status, cb, input) {
  request[reqType](reqUrl + url, createForm(input), function(err, res, body) {
    expect(!!err).to.equal(false);
    if (err) {throw err;}
    expect(res.statusCode).to.equal(status);
    if (body) {
      body = JSON.parse(body);
      cb(body);
    }
  });
};

var userDataCallback = function() {
  var userid, petid, vetid, requestid, vaccineid;
  before(function(done) {
    insert('user', 'id', {email: 'hell@o.com', password: 'password', type: 'user', status: 'active'})
      .then(function(user){
        userid = user[0];
        return insert('pet', 'id', {name: 'appl'});
      })
      .then(function(pet) {
        petid = pet[0];
        return insert('user_pet', 'id', {user_id: userid, pet_id: petid});
      })
      .then(function(userpet){
        return insert('vet', 'id', {practiceName: 'vetpractice', contactMethod: 'phone'});
      })
      .then(function(vet) {
        vetid = vet[0];
        return insert('request', 'id', {user_id: userid, pet_id: petid, vet_id: vetid, status: 'Pending'});
      })
      .then(function(request){
        requestid = request[0];
        return insert('vaccine', 'id', {name: 'vaccine1'});
      })
      .then(function(vaccine) {
        vaccineid = vaccine[0];
        return insert('pet_vaccine', 'id', {pet_id: petid, vaccine_id: vaccineid, request_id: requestid});
      })
      .then(function(petvaccine) {
        return insert('pet_vaccine', 'id', {pet_id: petid, vaccine_id: vaccineid, request_id: requestid});
      })
      .then(function(petvaccine2) {
        done();
      });
  });
};

var adminDataCallback = function() {
  var adminid;
  before(function(done) {
    insert('user', 'id', {email: 'admi@n.com', password: 'password', type: 'admin', status: 'active'})
      .then(function(admin) {
        adminid = admin[0];
        return insert('vetContact', 'id', {name: 'paul', title: 'receptionist', email: 'paul@vet.com', phone: '1234567890', vet_id: 1});
      })
      .then(function(vetContactid) {
        return insert('contactHistory', 'id', {adminUser_id: adminid, type: 'phone', request_id: 1, vetContact_id: 1});
      })
      .then(function(contactHistoryid) {
        return insert('contactHistory', 'id', {adminUser_id: adminid, type: 'phone', request_id: 1, vetContact_id: 1});
      })
      .then(function(contactHistoryid) {
        return insert('pdfRecord', 'id', {link: 'www.samplepdf.asd', request_id: 1});
      })
      .then(function(pdfid) {
        done();
      });
  });
};

module.exports = exports = {
  createForm : createForm,
  userDataCallback : userDataCallback,
  adminDataCallback : adminDataCallback,
  reqUrl : reqUrl,
  insert : insert,
  _test : _test
};
