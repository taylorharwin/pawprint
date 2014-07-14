angular.module('user.common.services')

  .service('CurrentUserService', function (UserRESTService, $rootScope, AuthService) {

    var currentUser = null;

    function retrieveUser (id) {
      return UserRESTService.getUser(id).then(function (user) {
        currentUser = user;
        return user;
      });
    }

    function getUser () {
      return currentUser;
    }

    function enterUser (user, type, enterError) {
      UserRESTService.postUser(user, type)
        .then(function (response) {
          console.log(response);
          AuthService.login(response.token, response.id);
          if (type === 'login') {
            $rootScope.$state.go('app.main');
          } else if (type === 'signup') {
            $rootScope.$state.go('app.main');
          }
        }, function (error) {
          console.log(error);
          enterError = true;
          AuthService.logout();
        });
    }

    function exitUser () {
      AuthService.logout();
      $rootScope.$state.go('public');
    }

    function updateUser () {
      return currentUser.put();
    }

    function deleteUser () {
      currentUser.remove().then(function (response) {
        console.log('deleted user');
        AuthService.logout();
        currentUser = null;
        $rootScope.$state.go('public');
      }, function (error) {
        console.log(error);
      });
    }

    this.retrieveUser = retrieveUser;
    this.getUser = getUser;
    this.enterUser = enterUser;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;

  });