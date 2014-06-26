angular.module('user.common.services')

  .service('UserRESTService', function (Restangular){

    function postUser(data, type) {
      return Restangular.all('user/' + type).post(data);
    }

    function getUser (id) {
      return Restangular.one('user', id).get();
    }

    function deleteUser (id) {
      return Restangular.one('user', id).remove();
    }

    this.postUser = postUser;
    this.getUser = getUser;
    this.deleteUser = deleteUser;

  });
