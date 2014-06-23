var db                = require('../app/db_config.js'),
    Q                 = require('q'),
    Utils             = require('../app/utils.js'),
    // INCLUDE DATA MODELS FOR BOOKSHELF.JS
    ContactHistory    = require('../app/models/contactHistory.js'),
    PdfRecord         = require('../app/models/pdfRecord.js'),
    Pet               = require('../app/models/pet.js'),
    Pet_Vaccine       = require('../app/models/pet_vaccine.js'),
    Request           = require('../app/models/request.js'),
    User              = require('../app/models/user.js'),
    Vaccine           = require('../app/models/vaccine.js'),
    Vet               = require('../app/models/vet.js'),
    VetContact        = require('../app/models/vetContact.js');

var get = {
  requests: Utils.getter(Request, {all: true}),

  request: Utils.getter(Request, {
    query: { id: 'requestid'}
  }),

  pet: Utils.getter(Pet, {
    query: { id: 'petid' }
  }),

  user: Utils.getter(User, {
    query: { id: 'userid' },
    omit: ['password', 'salt', 'jwt']
  }),

  vet: Utils.getter(Vet, {
    query: { id: 'vetid' }
  }),

  vetContacts: Utils.getter(VetContact, {
    query: { vet_id: 'vetid' },
    all: true
  }),

  petVaccines: Utils.getter(Pet_Vaccine, {
    query: { request_id: 'requestid' },
    all: true
  }),

  logs: Utils.getter(ContactHistory, {
    query: { request_id: 'requestid' },
    all: true
  }),

  pdfs: Utils.getter(PdfRecord, {
    query: { request_id: 'requestid' },
    all: true
  }),

  vaccines: Utils.getter(Vaccine, {
    all: true
  })

};

var post = {
  petVaccine: function(req, res) {
    var requestid = req.params.requestid;
    var vaccines = req.body;

    // search for the request with the desired request id
    Request.forge({id: requestid}).fetch()
      .then(function(request){
        var PetVaccines = db.Collection.extend({model: Pet_Vaccine});
        return PetVaccines.forge(vaccines).mapThen(function(model){
          model.set({
            request_id: req.params.requestid,
            pet_id: request.attributes.pet_id
            // TODO set date of expiration
          });
          return model.save();
        });
      }).then(function(collection) {
        res.send(201, collection);
      });
  },

  vaccine: Utils.creator(Vaccine),

  log: Utils.creator(ContactHistory, {params: {
    adminUser_id: 'adminid',
    request_id: 'requestid'
  }}),

  vetContact: Utils.creator(VetContact, {params: {
    vet_id: 'vetid'
  }}),

  pdf: function(req, res) {
    // TODO, this will be a multi-part form request
  }
};

var put = {
  log          : Utils.updater(ContactHistory, {id: 'logid'}),
  petVaccine   : Utils.updater(Pet_Vaccine, {id: 'vaccineid'}),
  pdf          : Utils.updater(PdfRecord, {id: 'pdfid'}),
  vetContact   : Utils.updater(VetContact, {id: 'vetcontactid'}),
  request      : Utils.updater(Request, {id: 'requestid'})
};

var destroy = {
  petVaccine   : Utils.deleter(Pet_Vaccine, {id: 'vaccineid'}),
  log          : Utils.deleter(ContactHistory, {id: 'logid'}),
  pdf          : Utils.deleter(PdfRecord, {id: 'pdfid'}),
  vetContact   : Utils.deleter(VetContact, {id: 'vetcontactid'})
};

module.exports = exports = {
  get      : get,
  post     : post,
  put      : put,
  destroy  : destroy
};
