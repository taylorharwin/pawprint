var db = require('../app/db_config.js')
    Request = require('../app/models/request.js'),
    Requests = require('../app/collections/requests.js'),
    Pet_Vaccine = require('../app/models/pet_vaccine.js'),
    Pet_Vaccines = require('../app/collections/pet_vaccines.js'),
    Q    = require('q');

var createVaccine = function(req, res) {
  var requestid = req.params.requestid;
  var vaccines = req.body; // assumes request with vaccine_i

  // search for the request with the desired request id
  Request.forge({id: requestid}).fetch()
    .then(function(request){
      if (request) {
        // insert pet_id into vaccine information
        for (var i = 0; i < vaccines.length; i++) {
          // check if this works
          vaccines[i].pet_id = request.attributes.pet_id;
        }
        // Bookshelf syntax for inserting a collection of vaccines
        var PetVaccines = db.Collection.extend({model: Pet_Vaccine});
        PetVaccines.forge(vaccines).mapThen(function(model){
          console.log(model);
          return model.save().then(function(pet_vaccine){
            return pet_vaccine.get('id');
          });
        }).then(function(done) {
          res.send(201, done);
        });
      }
    });
};

module.exports = exports = {
  createVaccine : createVaccine
};
