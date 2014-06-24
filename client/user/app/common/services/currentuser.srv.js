angular.module('user.common.services')

  .service('CurrentUserService', function (UserService, $rootScope) {

    var currentUser = null;

    function setUser (user) {
      currentUser = user;
    }

    function getUser () {
      return currentUser;
    }

    function enterUser (user, type, enterError) {
      UserService.postUserLogin(user)
        .then(function (response) {
          currentUser = response;
          if (type === 'login') {
            $rootScope.$state.go('app.main');
          } else if (type === 'signup') {
            $rootScope.$state.go('app.profile');
          }
        }, function (error) {
          console.log(error);
          enterError = true;
        });
    }

    function updateUser () {
      return currentUser.put();
    }

    function deleteUser () {
      currentUser.remove().then(function (response) {
        console.log('deleted user');
        // @NOTE delete the local auth settings
        currentUser = null;
        $rootScope.$state.go('public.home');
      }, function (error) {
        console.log(error);
      });
    }

    this.setUser = setUser;
    this.getUser = getUser;
    this.enterUser = enterUser;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;

  });