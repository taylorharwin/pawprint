angular.module('admin.common.services')
  .service('AuthService', function ($cookies) {

    $cookies.loggedin = false;
    $cookies.token = undefined;
    $cookies.userId = undefined;

    function getCookie () {
      return $cookies;
    }

    function login (token, userId) {
      $cookies.loggedin = true;
      $cookies.token = token;
      $cookies.userId = userId;
    }

    function logout () {
      $cookies.loggedin = false;
      delete $cookies.token;
      delete $cookies.userId;
    }

    this.getCookie = getCookie;
    this.login = login;
    this.logout = logout;

  });