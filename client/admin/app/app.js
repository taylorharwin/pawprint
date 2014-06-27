'use strict';
/*global angular */

angular.module('admin', [
  'ui.router',
  'ui.bootstrap',
  'restangular',
  'ngCookies',

  'admin.common',
  'admin.login',
  'admin.allRequests',
  'admin.eachRequest'
])


.config(function ($locationProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  // $locationProvider.html5Mode(true);
})

.factory('authInterceptor', function ($rootScope, $q, AuthService) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (AuthService.getCookie().loggedin) {
        config.headers.Authorization = 'Bearer ' + AuthService.getCookie().token;
      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        $rootScope.$state.go('public.login');
      }
      return $q.reject(rejection);
    }
  };
})
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });