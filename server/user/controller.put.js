var User      = require('../app/models/user.js'),
    Pet       = require('../app/models/pet.js'),
    Utils     = require('../app/utils.js');

var putUser = Utils.updater(User, {
  id: 'userid',
  omit: ['password', 'salt', 'jwt', 'type']
});

var putPet = Utils.updater(Pet, {
  id: 'petid',
});

module.exports = exports = {
  putUser : putUser,
  putPet : putPet
};
