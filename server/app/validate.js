/* ABOUT THIS FILE:
 * validate.js is for helper functions that checks for specific permissions
 * All functions should return a boolean in the form of a promise
 */

/* TODO
 * isUser: Only user should be able to delete user, this should be covered by auth?
 */

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

/* Check if user owns a pet before allowing them to perform actions involving the pet
 *
 * Example usage:
 *
 * Validate.userOwnsPet(userid, petid)
 * .then(function(valid) {
 *   if (!valid) {
 *     res.send(401, 'Not Authorized');
 *   } else {
 *     db.knex('request')
 *       .where('pet_id', petid)
 *       .select()
 *       .then(function(requests) {
 *         res.send(200, requests);
 *       });
 *   }
 * }).catch(function(err) {
 *   console.error(err);
 *   res.send(500, 'Internal server error'); // This has an error if 401 is already sent
 * });
 */

var userOwnsPet = function(userid, petid) {
  return db.knex('user_pet')
    .where({
      user_id: userid,
      pet_id: petid,
    })
    .select()
    .then(function(found) {
      if(found.length === 0) {
        return false;
      } else {
        return true;
      }
    });
};

// isRequester: Only user of the request can cancel the request

module.exports = exports = {
  userOwnsPet: userOwnsPet
};
