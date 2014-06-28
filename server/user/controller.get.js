var User      = require('../app/models/user.js'),
    Pet       = require('../app/models/pet.js'),
    Request   = require('../app/models/request.js'),
    db        = require('../app/db_config.js'),
    Utils     = require('../app/utils.js'),
    Validate  = require('../app/validate.js'),
    Q         = require('q');

var getUser = Utils.getter(User, {
  query: { id: 'userid'},
  omit: ['password', 'salt', 'signature', 'type', 'jwt']
});

var getPets = function(req, res) {
  var userid = req.params.userid;

  db.knex('user_pet')
    .join('pet', 'user_pet.pet_id', '=', 'pet.id')
    .where('user_pet.user_id', userid)
    .select('pet.id', 'name', 'birthdate', 'gender', 'breed', 'color', 'weight',
      'neuter', 'microchip', 'profilePic')
    .then(function(pets) {
      res.send(200, pets);
    });
};

var getRequests = function(req, res) {
  var userid = req.params.userid;
  var petid = req.params.petid;
  
  Validate.userOwnsPet(userid, petid)
  .then(function(valid) {
    if (!valid) {
      res.send(401, 'Not Authorized');
    } else {
      db.knex('request')
        .where('pet_id', petid)
        .select()
        .then(function(requests) {
          res.send(200, requests);
        });
    }
  }).catch(function(err) {
    console.error(err);
    res.send(500, 'Internal server error'); // This has an error if 401 is already sent
  });
};

var getVaccines = function(req, res) {
  var userid = req.params.userid;
  var petid = req.params.petid;
  
  Validate.userOwnsPet(userid, petid)
  .then(function(valid) {
    if (!valid) {
      res.send(401, 'Not Authorized');
    } else {
      db.knex('pet_vaccine')
        .where('pet_id', petid)
        .select()
        .then(function(vaccines) {
          res.send(200, vaccines);
        });
    }
  }).catch(function(err) {
    console.error(err);
    res.send(500, 'Internal server error');
  });
};

module.exports = exports = {
  getUser : getUser,
  getPets : getPets,
  getRequests : getRequests,
  getVaccines : getVaccines
};
