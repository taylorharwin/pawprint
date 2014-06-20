angular.module('user.pages.services')

  .factory('CurrentUserFactory', function () {

    var currentUser = null;

    function setUser (user) {
      currentUser = user;
    }

    function getUser () {
      return currentUser;
    }

    return {
      setUser: setUser,
      getUser: getUser
    };

  });