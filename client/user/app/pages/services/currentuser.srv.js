angular.module('user.pages.services')

  .factory('CurrentUserFactory', function () {

    var userId = null;

    function setUserId (id) {
      userId = id;
    }

    function getUserId () {
      return userId;
    }

    return {
      setUserId: setUserId,
      getUserId: getUserId
    };

  });