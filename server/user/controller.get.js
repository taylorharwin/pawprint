var User      = require('../app/models/user.js'),
    Pet       = require('../app/models/pet.js'),
    Request   = require('../app/models/request.js'),
    db        = require('../app/db_config.js'),
    Utils     = require('../app/utils.js'),
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
    .select('pet.id', 'name', 'birthdate', 'gender', 'breed', 'color', 'weight', 'neuter', 'microchip', 'profilePic', 'pet.created_at', 'pet.updated_at')
    .then(function(pets) {
      res.send(200, pets);
    });
};

var getRequests = function(req, res) {
  var userid = req.params.userid;
  var petid = req.params.petid;
  
  // check if user has permissions for this pet
  db.knex('user_pet')
    .where({
      user_id: userid,
      pet_id: petid,
    })
    .select()
    .then(function(found) {
      if(found.length === 0) {
        res.send(401, 'Not Authorized');
        throw new Error('Not Authorized');
      }
    }).then(function() {
      db.knex('request')
        .where('pet_id', petid)
        .select()
        .then(function(requests) {
          res.send(200, requests);
        });
    });
};

var getVaccines = function(req, res) {
  var userid = req.params.userid;
  var petid = req.params.petid;
  
  // check if user has permissions for this pet
  db.knex('user_pet')
    .where({
      user_id: userid,
      pet_id: petid,
    })
    .select()
    .then(function(found) {
      if(found.length === 0) {
        res.send(401, 'Not Authorized');
        throw new Error('Not Authorized');
      }
    })
    // if they own the pet, query pet-vaccine table with petid
    .then(function() {
      db.knex('pet_vaccine')
        .where('pet_id', petid)
        .select()
        .then(function(vaccines) {
          res.send(200, vaccines);
        });
    })
    .catch(function(err) {
      console.error(err);
    });
};

module.exports = exports = {
  getUser : getUser,
  getPets : getPets,
  getRequests : getRequests,
  getVaccines : getVaccines
};
