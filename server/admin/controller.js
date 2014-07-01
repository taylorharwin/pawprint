var db                = require('../app/db_config.js'),
    Utils             = require('../app/utils.js'),
    pdfHelpers        = require('./pdf_helpers.js'),
    nodePath          = require('path'),
    fs                = require('fs'),
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
  pdfid: function (req, res) {
    var pdfid = req.params.pdfid;
    var requestid = req.params.requestid;
    var model = new PdfRecord().query({where: {id: pdfid, request_id: requestid}});
    model.fetch().then(function (pdf) {
      var path = pdf.get('link');
      res.sendfile(path);
    }).catch(function (err) {
      console.error(err);
      res.send(500, 'Internal server error');
    });
  },
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
  petVaccine: function (req, res) {
    var requestid = req.params.requestid;
    var vaccines = req.body;
    // search for the request with the desired request id
    Request.forge({id: requestid}).fetch()
      .then(function (request) {
        var PetVaccines = db.Collection.extend({model: Pet_Vaccine});
        return PetVaccines.forge(vaccines).mapThen(function (model) {
          var startDate = model.get('dateAdministered');
          return Vaccine.forge({id: model.get('vaccine_id')}).fetch().then(function (vaccine) {
            var duration = vaccine.get('duration');
            var endDate;
            if (duration) {
              var date = new Date(startDate);
              endDate = new Date(date.setDate(date.getDate() + duration));
              endDate = endDate.getFullYear() + '-' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '-' + ('0' + endDate.getDate()).slice(-2);
            }
            model.set({
              request_id: req.params.requestid,
              pet_id: request.attributes.pet_id,
              dateExpired: endDate
            });
            return model.save();
          });
        });
      }).then(function (collection) {
        res.send(201, collection);
      });
  },
  pdf: function (req, res) {
    var requestid = req.params.requestid;
    var pdf = req.files.file;
    var size = req.files.file.ws.bytesWritten;
    var type = pdf.type;
    var regex = /^(application\/pdf)$/i;
    var bool = pdfHelpers.filesizeCheck(size) && pdfHelpers.filenameRegEx(pdf.originalFilename) && regex.test(type);
    var newfilename = requestid + '_' + (new Date()).getTime() + '.pdf';
    if (bool) {
      var serverPath = nodePath.join(pdfHelpers.dirName, newfilename);
      pdfHelpers.pdfSave(pdf.path, serverPath, function (path) {
        PdfRecord.forge({
          request_id: requestid,
          link: path
        }).save().then(function (model) {
          res.send(201, model);
        }).catch(function (err) {
          console.error(err);
          res.send(500, 'Internal server error');
        });
      });
    } else {
      res.send(404, 'Sorry, please upload a .pdf under 3 MB');
    }
  },
  vaccine: Utils.creator(Vaccine),
  log: Utils.creator(ContactHistory, {params: {
    adminUser_id: 'adminid',
    request_id: 'requestid'
  }}),
  vetContact: Utils.creator(VetContact, {params: {
    vet_id: 'vetid'
  }})
};

var put = {
  petVaccine   : function (req, res) {
    var petvaccineid = req.params.vaccineid;
    Pet_Vaccine.forge({id: petvaccineid}).fetch().then(function (model) {
      return model.save(req.body, {patch: true});
    }).then(function (model) {
      var startDate = model.get('dateAdministered');
      return Vaccine.forge({id: model.get('vaccine_id')}).fetch().then(function (vaccine) {
        var duration = vaccine.get('duration');
        var endDate;
        if (duration) {
          var date = new Date(startDate);
          endDate = new Date(date.setDate(date.getDate() + duration));
          endDate = endDate.getFullYear() + '-' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '-' + ('0' + endDate.getDate()).slice(-2);
        }
        return model.save({dateExpired: endDate}, {patch: true});
      }).then(function (model) {
        res.send(200, model);
      }).catch(function (err) {
        console.error(err);
        res.send(500, 'Internal server error');
      });
    });
  },
  log          : Utils.updater(ContactHistory, {id: 'logid'}),
  pdf          : Utils.updater(PdfRecord, {id: 'pdfid'}),
  vetContact   : Utils.updater(VetContact, {id: 'vetcontactid'}),
  request      : Utils.updater(Request, {id: 'requestid'})
};

var destroy = {
  pdf          : function (req, res) {
    var pdfid = req.params.pdfid;
    PdfRecord.forge({id: pdfid}).fetch().then(function (pdf) {
      var path = pdf.get('link');
      fs.unlink(path, function () {
        pdf.destroy(res.send(200, pdf));
      });
    }).catch(function (err) {
      console.error(err);
      res.send(500, 'Internal server error');
    });
  },
  petVaccine   : Utils.deleter(Pet_Vaccine, {id: 'vaccineid'}),
  log          : Utils.deleter(ContactHistory, {id: 'logid'}),
  vetContact   : Utils.deleter(VetContact, {id: 'vetcontactid'})
};

module.exports = exports = {
  get      : get,
  post     : post,
  put      : put,
  destroy  : destroy
};
