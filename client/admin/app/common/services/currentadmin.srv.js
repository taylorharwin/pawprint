angular.module('admin.common.services')

  .service('CurrentAdminService', function (Restangular, AuthService, $rootScope) {

    var currentAdmin = null;

    function setAdminId (adminId) {
      currentAdmin = adminId;
    }

    function getAdminId () {
      return currentAdmin;
    }

    function login (admin) {
      Restangular.all('admin/login').post(admin)
        .then(function (response) {
          AuthService.login(response.token, response.id);
          //temporary to make sure everything still works
          currentAdmin = response.id;
          $rootScope.$state.go('app.allRequests');
        }, function (error) {
          console.log(error);
          AuthService.logout();
        });
    }

    this.setAdminId = setAdminId;
    this.getAdminId = getAdminId;
    this.login = login;

  });