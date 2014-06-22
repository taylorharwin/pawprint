var db = require('../app/db_config.js');
var User = require('../app/models/user.js'),
    Pet = require('../app/models/pet.js'),
    Request = require('../app/models/request.js'),
    Vet = require('../app/models/vet.js');
    
var reqPort = 9000;
var reqUrl = 'http://localhost:' + reqPort;

var createForm = function(obj) {
  return {form : obj};
};

var userDataCallback = function() {
  var userid, petid, vetid, requestid, vaccineid;
  before(function(done) {
    db.knex('user').returning('id')
      .insert({email: 'hell@o.com', password: 'password'})
      .then(function(user) {
        userid = user[0];
        return db.knex('pet').returning('id')
          .insert({name: 'appl'});
      })
      .then(function(pet) {
        petid = pet[0];
        return db.knex('user_pet').returning('id')
          .insert({user_id: userid, pet_id: petid});
      })
      .then(function(userpet){
        return db.knex('vet').returning('id')
          .insert({practiceName: 'vetpractice', contactMethod: 'phone'});
      })
      .then(function(vet) {
        vetid = vet[0];
        return db.knex('request').returning('id')
          .insert({user_id: userid, pet_id: petid, vet_id: vetid, status: 'Pending'});
      })
      .then(function(request){
        requestid = request[0];
        return db.knex('vaccine').returning('id')
          .insert({name: 'vaccine1'});
      })
      .then(function(vaccine) {
        vaccineid = vaccine[0];
        return db.knex('pet_vaccine').returning('id')
          .insert({pet_id: petid, vaccine_id: vaccineid, request_id: requestid});
      })
      .then(function(petvaccine) {
        return db.knex('pet_vaccine').returning('id')
          .insert({pet_id: petid, vaccine_id: vaccineid, request_id: requestid});
      })
      .then(function(petvaccine2) {
        done();
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

  before(function(done) {
    db.knex('pdfRecord').returning('id')
      .insert({link: 'www.samplepdf.asd', request_id: 1})
      .then(function(pdfid) {
        pdfid = pdfid[0];
        done();
      });
  });
};

module.exports = exports = {
  createForm : createForm,
  userDataCallback : userDataCallback,
  serverDataCallback : serverDataCallback,
  reqUrl : reqUrl
};
