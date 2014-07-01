/*global angular */

angular.module('user.common.services')
  .service('AuthService', function ($cookieStore) {

    // $cookies.loggedin = false;
    // $cookies.token = undefined;
    // $cookies.userId = undefined;

    function getCookie() {
      return $cookieStore;
    }

    function login(token, userId) {
      $cookieStore.put('loggedin', true);
      $cookieStore.put('token', token);
      $cookieStore.put('userId', userId);
    }

    function logout() {
      $cookieStore.put('loggedin', false);
      $cookieStore.put('token', undefined);
      $cookieStore.put('userId', undefined);
    }

    this.getCookie = getCookie;
    this.login = login;
    this.logout = logout;

  });