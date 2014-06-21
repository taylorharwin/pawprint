var db = require('../app/db_config.js');
var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Pet = require('../app/models/pet.js'),
    Pets = require('../app/collections/pets.js'),
    Request = require('../app/models/request.js'),
    Requests = require('../app/collections/requests.js'),
    Vet = require('../app/models/vet.js'),
    Vets = require('../app/collections/vets.js');

var reqPort = 9000;
var reqUrl = 'http://localhost:' + reqPort;

var createForm = function(obj) {
  return {form : obj};
};

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
