
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
  var newpet, newuser;

  Pet.forge(req.body).save().then(function(pet) {
    if (!pet) throw new Error('Save Failed');
    newpet = pet;
    return User.forge({id: userid}).fetch();
  })
  .then(function(user) {
    newuser = user;
    if (!user) throw new Error('User Does Not Exist');
    return user.pet().attach(newpet);
  })
  .then(function() {
    return User_Pet.forge({user_id: newuser.id, pet_id: newpet.id}).fetch();
  })
  .then(function(join) {
    if (!join) throw new Error('Bad Join');
    var date = new Date();
    join.save({created_at: date, updated_at: date}, {patch: true});
    res.send(201, newpet);
  })
  .catch(function(err){
    console.error(err);
    res.send(500, 'Internal Server Error');
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
