var User      = require('../app/models/user.js'),
    Pet       = require('../app/models/pet.js'),
    User_Pet  = require('../app/models/user_pet.js'),
    Request   = require('../app/models/request.js'),
    Vet       = require('../app/models/vet.js'),
    db        = require('../app/db_config.js'),
    Utils     = require('../app/utils.js'),
    Q         = require('q');

// Changes user status to deactivated, DO NOT actually delete the user
var deleteUser = Utils.updater(User, {
  id: 'userid',
  params: {
    status: 'deactivated'
  },
  omit: ['password', 'salt', 'jwt', 'type']
});

// Disconnect user and pet, DO NOT actually delete the pet
var deletePet = function(req, res) {
  // NEED USER PET MODEL
  // This can be refactored to use Utils.deleter if deleter takes multiple query options
  User_Pet.forge({pet_id: req.params.petid, user_id: req.params.userid})
    .fetch().then(function(model) {
      model.destroy(res.send(200, model));
    });
};

// Updates the request status to canceled, DO NOT actually delete the request
var deleteRequest = function(req, res) {
  var requestid = req.params.requestid;

  Request.forge({id : requestid}).fetch().then(function(request) {
    // TODO: verify
    request.attributes.status = 'canceled';
    request.save(request.attributes, {patch: true});
    res.send(200, request);
  });
};

module.exports = exports = {
  deleteUser : deleteUser,
  deletePet : deletePet,
  deleteRequest : deleteRequest
};
