angular.module('user.pages.services')

  .factory('CurrentUserFactory', function () {

    var currentUser = null;

    function setUserId (userId) {
      currentUser = userId;
    }

    function getUserId () {
      return currentUser;
    }

    return {
      setUserId: setUserId,
      getUserId: getUserId
    };

  });