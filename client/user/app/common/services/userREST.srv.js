angular.module('user.common.services')

  .service('UserRESTService', function (Restangular){

    function postUserSignup (data) {
      // return Restangular.all('user/signup').post(data);
      return Restangular.all('user').post(data);
    }

    function postUserLogin (data) {
      // return Restangular.all('user/login').post(data);
      return Restangular.all('user').post(data);
    }

    //@TODO, use this instead when auth is working,
    // function postUser(data, type) {
    //   return Restangular.all('user/' + type).post(data);
    // }

    function getUser (id) {
      return Restangular.one('user', id).get();
    }

    function deleteUser (id) {
      return Restangular.one('user', id).remove();
    }

      this.postUserSignup = postUserSignup;
      this.postUserLogin = postUserLogin;
      this.getUser = getUser;
      this.deleteUser = deleteUser;

  });
