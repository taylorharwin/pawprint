
var User      = require('../app/models/user.js'),
    Pet       = require('../app/models/pet.js'),
    Request   = require('../app/models/request.js'),
    Vet       = require('../app/models/vet.js'),
    User_Pet  = require('../app/models/user_pet.js'),
    db        = require('../app/db_config.js'),
    Utils     = require('../app/utils.js'),
    Q         = require('q');

// TODO: validations for field length/type

var createUser = Utils.creator(User, {
  omit: ['password', 'salt', 'jwt', 'type']
});

var createPet = function(req, res) {
  var userid = req.params.userid;
  var newpet;

  Pet.forge(req.body).save().then(function(pet) {
    newpet = pet;
    return User.forge({id: userid}).fetch();
  })
  .then(function(user) {
    // attaches pet to user through the user_pet table
    user.pet().attach(newpet);
    return user;
  })
  .then(function(user) {
    return User_Pet.forge({user_id: user.id, pet_id: newpet.id}).fetch();
  })
  .then(function(join) {
    var date = new Date();
    join.save({created_at: date, updated_at: date}, {patch: true});
    res.send(201, newpet);
  });
};

var createRequest = Utils.creator(Request, {params: {
  user_id: 'userid',
  pet_id: 'petid'
}});

var createVet = Utils.creator(Vet);

module.exports = exports = {
  createUser : createUser,
  createPet : createPet,
  createRequest : createRequest,
  createVet : createVet
};
