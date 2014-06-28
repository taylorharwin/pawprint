var User      = require('../app/models/user.js'),
    Pet       = require('../app/models/pet.js'),
    User_Pet  = require('../app/models/user_pet.js'),
    Request   = require('../app/models/request.js'),
    Vet       = require('../app/models/vet.js'),
    db        = require('../app/db_config.js'),
    Utils     = require('../app/utils.js'),
    Validate  = require('../app/validate.js'),
    Q         = require('q');

// Changes user status to deactivated, DO NOT actually delete the user
var deleteUser = Utils.updater(User, {
  id: 'userid',
  params: {
    status: 'not active'
  },
  omit: ['password', 'salt', 'jwt', 'type']
});

// Disconnect user and pet, DO NOT actually delete the pet
var deletePet = function(req, res) {
  var userid = req.params.userid;
  var petid = req.params.petid;

  Validate.userOwnsPet(userid, petid)
  .then(function(valid) {
    if (!valid) {
      res.send(401, 'Not Authorized');
    } else {
      User_Pet.forge({pet_id: req.params.petid, user_id: req.params.userid})
      .fetch().then(function(model) {
        model.destroy(res.send(200, model));
      });
    }
  }).catch(function(err) {
    console.error(err);
    res.send(500, 'Internal server error'); // This has an error if 401 is already sent
  });
};

// Updates the request status to canceled, DO NOT actually delete the request
var deleteRequest = function(req, res) {
  var userid = req.params.userid;
  var requestid = req.params.requestid;

  Validate.userIsRequester(userid, requestid)
  .then(function(valid){
    if(!valid) {
      res.send(401, 'Not Authorized');
    } else {
      Request.forge({id : req.params.requestid}).fetch().then(function(request) {
        request.attributes.status = 'canceled';
        request.save(request.attributes, {patch: true});
        res.send(200, request);
      });
    }
  }).catch(function(err) {
    console.error(err);
    res.send(500, 'Internal server error'); // This has an error if 401 is already sent
  });
};

module.exports = exports = {
  deleteUser : deleteUser,
  deletePet : deletePet,
  deleteRequest : deleteRequest
};
