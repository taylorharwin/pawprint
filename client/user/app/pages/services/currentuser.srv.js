angular.module('user.pages.services')

  .factory('CurrentUserFactory', function () {

    var userId = null;
    var petIds = [];

    function setUserId (id) {
      userId = id;
    }

    function getUserId () {
      return userId;
    }

    // function addPetId (id) {
    //   petIds.push(id);
    // }

    // function removePetId (id) {
    //   for (var i=0; i<petIds.length; i++) {
    //     if (petIds[i] === id) {
    //       petIds.splice(i, 1);
    //     }
    //   }
    // }

    // function getPetIds () {
    //   return petIds;
    // }

    return {
      setUserId: setUserId,
      getUserId: getUserId,
      // addPetId: addPetId,
      // getPetIds: getPetIds
      // removePetId: removePetId,
    };

  });