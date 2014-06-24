angular.module('user.common.services')

  .service('CurrentUserService', function (UserService, $rootScope) {

    var currentUser = null;

    function setUser (user) {
      currentUser = user;
    }

    function getUser () {
      return currentUser;
    }

    function enterUser (user, type, error) {
      UserService.postUserLogin(user)
        .then(function (response) {
          setUser(response);
          if (type === 'login') {
            $rootScope.$state.go('app.main');
          } else if (type === 'signup') {
            $rootScope.$state.go('app.profile');
          }
        }, function (error) {
          error = true;
        });
    }

    this.setUser = setUser;
    this.getUser = getUser;
    this.enterUser = enterUser;

  });